#!/usr/bin/env tsx

import { spawn, type ChildProcess } from 'node:child_process';
import { createReadStream } from 'node:fs';
import { mkdir, mkdtemp, rm, stat, writeFile } from 'node:fs/promises';
import { createServer, type Server, type ServerResponse } from 'node:http';
import net from 'node:net';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const A4 = {
  widthInches: 210 / 25.4,
  heightInches: 297 / 25.4,
};

const DEFAULT_INPUT = 'dist/site/index.html';
const DEFAULT_OUTPUT = 'dist/resume.pdf';
const DEFAULT_TIMEOUT_MS = 30_000;
const DEFAULT_WAIT_MS = 250;

type RenderOptions = {
  chrome: string;
  help?: boolean;
  input: string;
  output: string;
  timeoutMs: number;
  waitMs: number;
};

type PendingMessage = {
  reject: (error: Error) => void;
  resolve: (value: Record<string, unknown>) => void;
};

type CdpMessage = {
  error?: { message: string };
  id?: number;
  method?: string;
  params?: Record<string, unknown>;
  result?: Record<string, unknown>;
  sessionId?: string;
};

type RuntimeEvaluateResult = {
  exceptionDetails?: {
    exception?: {
      description?: string;
      value?: unknown;
    };
    text?: string;
  };
  result?: {
    description?: string;
    value?: unknown;
  };
};

type StaticServer = {
  close: () => Promise<void>;
  url: string;
};

function usage() {
  return `Usage:
  render-pdf [input.html] [output.pdf] [options]

Defaults:
  input   ${DEFAULT_INPUT}
  output  ${DEFAULT_OUTPUT}

Options:
  --chrome <path>       Chromium/Chrome executable. Defaults to CHROME_PATH or chromium.
  --timeout-ms <ms>     Navigation/render timeout. Defaults to ${DEFAULT_TIMEOUT_MS}.
  --wait-ms <ms>        Extra wait after React/fonts/images are ready. Defaults to ${DEFAULT_WAIT_MS}.
  -h, --help            Show this help.
`;
}

function parseArgs(argv: string[]): RenderOptions {
  const options: RenderOptions = {
    input: DEFAULT_INPUT,
    output: DEFAULT_OUTPUT,
    chrome: process.env.CHROME_PATH || process.env.CHROME_BIN || 'chromium',
    timeoutMs: DEFAULT_TIMEOUT_MS,
    waitMs: DEFAULT_WAIT_MS,
  };
  const positional: string[] = [];

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];

    if (arg === '-h' || arg === '--help') {
      options.help = true;
    } else if (arg === '--chrome') {
      options.chrome = requireValue(argv, (index += 1), arg);
    } else if (arg === '--timeout-ms') {
      options.timeoutMs = parsePositiveInt(requireValue(argv, (index += 1), arg), arg);
    } else if (arg === '--wait-ms') {
      options.waitMs = parsePositiveInt(requireValue(argv, (index += 1), arg), arg);
    } else if (arg.startsWith('--')) {
      throw new Error(`Unknown option: ${arg}`);
    } else {
      positional.push(arg);
    }
  }

  if (positional.length > 2) {
    throw new Error(`Expected at most 2 positional arguments, got ${positional.length}.`);
  }

  if (positional[0]) {
    options.input = positional[0];
  }
  if (positional[1]) {
    options.output = positional[1];
  }

  return options;
}

function requireValue(argv: string[], index: number, option: string) {
  const value = argv[index];
  if (!value || value.startsWith('--')) {
    throw new Error(`${option} requires a value.`);
  }
  return value;
}

function parsePositiveInt(value: string, option: string) {
  const parsed = Number.parseInt(value, 10);
  if (!Number.isFinite(parsed) || parsed < 0) {
    throw new Error(`${option} must be a positive integer.`);
  }
  return parsed;
}

function isRemoteUrl(input: string) {
  return /^https?:\/\//i.test(input);
}

function resolveLocalInput(input: string) {
  return input.startsWith('file://') ? fileURLToPath(input) : path.resolve(input);
}

async function getFreePort() {
  return await new Promise<number>((resolve, reject) => {
    const server = net.createServer();
    server.on('error', reject);
    server.listen(0, '127.0.0.1', () => {
      const address = server.address();
      if (!address || typeof address === 'string') {
        reject(new Error('Could not resolve free port.'));
        return;
      }

      server.close(() => resolve(address.port));
    });
  });
}

async function sleep(ms: number) {
  await new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

async function withTimeout<T>(promise: Promise<T>, timeoutMs: number, label: string) {
  let timer: ReturnType<typeof setTimeout> | undefined;
  const timeout = new Promise<never>((_, reject) => {
    timer = setTimeout(() => {
      reject(new Error(`${label} timed out after ${timeoutMs}ms.`));
    }, timeoutMs);
  });

  try {
    return await Promise.race([promise, timeout]);
  } finally {
    if (timer) {
      clearTimeout(timer);
    }
  }
}

async function startStaticServer(input: string): Promise<StaticServer> {
  const inputPath = resolveLocalInput(input);
  const rootDir = path.dirname(inputPath);
  const entryName = path.basename(inputPath);
  const server = createServer((request, response) => {
    void serveStaticFile(rootDir, entryName, request.url ?? '/', response);
  });

  await new Promise<void>((resolve, reject) => {
    server.once('error', reject);
    server.listen(0, '127.0.0.1', () => resolve());
  });

  const address = server.address();
  if (!address || typeof address === 'string') {
    throw new Error('Static server did not expose a TCP port.');
  }

  return {
    url: `http://127.0.0.1:${address.port}/${encodeURIComponent(entryName)}`,
    close: () => closeServer(server),
  };
}

async function serveStaticFile(rootDir: string, entryName: string, url: string, response: ServerResponse) {
  try {
    const requestUrl = new URL(url, 'http://127.0.0.1');
    const pathname = requestUrl.pathname === '/' ? `/${entryName}` : requestUrl.pathname;
    const relativePath = decodeURIComponent(pathname).replace(/^\/+/, '');
    let filePath = path.resolve(rootDir, relativePath);

    if (!isInsideDirectory(rootDir, filePath)) {
      sendText(response, 403, 'Forbidden');
      return;
    }

    const fileStat = await stat(filePath);
    if (fileStat.isDirectory()) {
      filePath = path.join(filePath, 'index.html');
    }

    response.writeHead(200, {
      'Cache-Control': 'no-store',
      'Content-Type': contentTypeFor(filePath),
    });
    createReadStream(filePath).pipe(response);
  } catch {
    sendText(response, 404, 'Not found');
  }
}

function isInsideDirectory(rootDir: string, filePath: string) {
  const relative = path.relative(rootDir, filePath);
  return relative === '' || (!relative.startsWith('..') && !path.isAbsolute(relative));
}

function contentTypeFor(filePath: string) {
  const extension = path.extname(filePath).toLowerCase();
  const contentTypes: Record<string, string> = {
    '.css': 'text/css; charset=utf-8',
    '.html': 'text/html; charset=utf-8',
    '.js': 'text/javascript; charset=utf-8',
    '.json': 'application/json; charset=utf-8',
    '.map': 'application/json; charset=utf-8',
    '.png': 'image/png',
    '.svg': 'image/svg+xml',
    '.woff': 'font/woff',
    '.woff2': 'font/woff2',
  };

  return contentTypes[extension] ?? 'application/octet-stream';
}

function sendText(response: ServerResponse, statusCode: number, body: string) {
  response.writeHead(statusCode, { 'Content-Type': 'text/plain; charset=utf-8' });
  response.end(body);
}

async function closeServer(server: Server) {
  await new Promise<void>((resolve, reject) => {
    server.close((error) => {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    });
  });
}

async function waitForDevTools(port: number, chromeProcess: ChildProcess, timeoutMs: number) {
  const endpoint = `http://127.0.0.1:${port}/json/version`;
  const startedAt = Date.now();
  let lastError: unknown;

  while (Date.now() - startedAt < timeoutMs) {
    if (chromeProcess.exitCode !== null) {
      throw new Error(`Chromium exited early with code ${chromeProcess.exitCode}.`);
    }

    try {
      const response = await fetch(endpoint);
      if (response.ok) {
        const json = (await response.json()) as { webSocketDebuggerUrl?: string };
        if (json.webSocketDebuggerUrl) {
          return json.webSocketDebuggerUrl;
        }
      }
    } catch (error) {
      lastError = error;
    }

    await sleep(100);
  }

  const suffix = lastError instanceof Error ? ` ${lastError.message}` : '';
  throw new Error(`Could not connect to Chromium DevTools.${suffix}`.trim());
}

class CdpConnection {
  private eventHandlers = new Set<(message: CdpMessage) => void>();
  private nextId = 1;
  private opened: Promise<Event>;
  private pending = new Map<number, PendingMessage>();
  private socket: WebSocket;

  constructor(webSocketUrl: string) {
    this.socket = new WebSocket(webSocketUrl);
    this.opened = new Promise((resolve, reject) => {
      this.socket.addEventListener('open', resolve, { once: true });
      this.socket.addEventListener('error', reject, { once: true });
    });

    this.socket.addEventListener('message', (event) => {
      this.handleMessage(event.data);
    });
    this.socket.addEventListener('close', () => {
      for (const { reject } of this.pending.values()) {
        reject(new Error('DevTools connection closed.'));
      }
      this.pending.clear();
    });
  }

  async send<T extends Record<string, unknown> = Record<string, unknown>>(
    method: string,
    params: Record<string, unknown> = {},
    sessionId: string | undefined = undefined,
  ): Promise<T> {
    await this.opened;

    const id = this.nextId;
    this.nextId += 1;

    const message: Record<string, unknown> = { id, method, params };
    if (sessionId) {
      message.sessionId = sessionId;
    }

    const response = new Promise<Record<string, unknown>>((resolve, reject) => {
      this.pending.set(id, { resolve, reject });
    });

    this.socket.send(JSON.stringify(message));
    return (await response) as T;
  }

  waitForEvent(
    sessionId: string,
    method: string,
    timeoutMs: number,
    predicate: (params: Record<string, unknown>) => boolean = () => true,
  ) {
    return withTimeout(
      new Promise<Record<string, unknown>>((resolve) => {
        const handler = (message: CdpMessage) => {
          if (message.sessionId !== sessionId || message.method !== method) {
            return;
          }

          const params = message.params ?? {};
          if (!predicate(params)) {
            return;
          }

          this.eventHandlers.delete(handler);
          resolve(params);
        };

        this.eventHandlers.add(handler);
      }),
      timeoutMs,
      method,
    );
  }

  handleMessage(data: unknown) {
    const message = JSON.parse(String(data)) as CdpMessage;

    if (message.id) {
      const pending = this.pending.get(message.id);
      if (!pending) {
        return;
      }

      this.pending.delete(message.id);
      if (message.error) {
        pending.reject(new Error(message.error.message));
      } else {
        pending.resolve(message.result ?? {});
      }
      return;
    }

    for (const handler of this.eventHandlers) {
      handler(message);
    }
  }

  close() {
    this.socket.close();
  }
}

async function evaluateOrThrow(
  cdp: CdpConnection,
  sessionId: string,
  expression: string,
  timeoutMs: number,
  label: string,
) {
  const result = await withTimeout(
    cdp.send<RuntimeEvaluateResult>(
      'Runtime.evaluate',
      {
        expression,
        awaitPromise: true,
        returnByValue: true,
      },
      sessionId,
    ),
    timeoutMs,
    label,
  );

  if (result.exceptionDetails) {
    throw new Error(formatRuntimeException(result.exceptionDetails));
  }

  return result.result?.value;
}

function formatRuntimeException(exceptionDetails: NonNullable<RuntimeEvaluateResult['exceptionDetails']>) {
  if (exceptionDetails.exception?.description) {
    return exceptionDetails.exception.description;
  }
  if (exceptionDetails.exception?.value) {
    return String(exceptionDetails.exception.value);
  }
  return exceptionDetails.text ?? 'Runtime evaluation failed.';
}

async function waitForResumeReady(cdp: CdpConnection, sessionId: string, timeoutMs: number) {
  const expression = String.raw`
    (async () => {
      if (window.__resumeRenderReady) {
        await window.__resumeRenderReady;
      }

      if (document.documentElement.dataset.renderError) {
        throw new Error(document.documentElement.dataset.renderError);
      }

      if (document.documentElement.dataset.renderReady === 'false') {
        await new Promise((resolve, reject) => {
          const startedAt = Date.now();
          const check = () => {
            if (document.documentElement.dataset.renderReady === 'true') {
              resolve(true);
            } else if (Date.now() - startedAt > 10000) {
              reject(new Error('Timed out waiting for React render readiness.'));
            } else {
              requestAnimationFrame(check);
            }
          };
          check();
        });
      }

      return true;
    })()
  `;

  await evaluateOrThrow(cdp, sessionId, expression, timeoutMs, 'Waiting for React render');
}

async function waitForPageAssets(cdp: CdpConnection, sessionId: string, timeoutMs: number) {
  const expression = String.raw`
    Promise.all([
      document.fonts && document.fonts.ready ? document.fonts.ready : true,
      Promise.all(Array.from(document.images).map((image) => {
        if (image.complete) return true;
        return new Promise((resolve) => {
          image.addEventListener('load', resolve, { once: true });
          image.addEventListener('error', resolve, { once: true });
        });
      })),
    ]).then(() => true)
  `;

  await evaluateOrThrow(cdp, sessionId, expression, timeoutMs, 'Waiting for fonts/images');
}

async function waitForProcessExit(chromeProcess: ChildProcess, timeoutMs: number) {
  if (chromeProcess.exitCode !== null) {
    return;
  }

  await Promise.race([
    new Promise((resolve) => {
      chromeProcess.once('exit', resolve);
    }),
    sleep(timeoutMs),
  ]);
}

async function removeDirectoryWithRetries(directory: string) {
  for (let attempt = 0; attempt < 6; attempt += 1) {
    try {
      await rm(directory, { force: true, recursive: true });
      return;
    } catch (error) {
      if (attempt === 5) {
        const message = error instanceof Error ? error.message : String(error);
        console.warn(`Warning: could not remove temporary Chromium profile: ${message}`);
        return;
      }
      await sleep(100 * (attempt + 1));
    }
  }
}

async function renderPdf(options: RenderOptions) {
  const devToolsPort = await getFreePort();
  const userDataDir = await mkdtemp(path.join(os.tmpdir(), 'resume-chromium-'));
  const staticServer = isRemoteUrl(options.input) ? undefined : await startStaticServer(options.input);
  const pageUrl = staticServer?.url ?? options.input;
  const outputPath = path.resolve(options.output);
  const chromeArgs = [
    '--headless=new',
    `--remote-debugging-port=${devToolsPort}`,
    `--user-data-dir=${userDataDir}`,
    '--disable-background-networking',
    '--disable-dev-shm-usage',
    '--disable-gpu',
    '--disable-sync',
    '--hide-scrollbars',
    '--no-default-browser-check',
    '--no-first-run',
    'about:blank',
  ];

  if (process.getuid?.() === 0) {
    chromeArgs.unshift('--no-sandbox');
  }

  const chromeProcess = spawn(options.chrome, chromeArgs, {
    stdio: ['ignore', 'ignore', 'pipe'],
  });
  let stderr = '';
  chromeProcess.stderr?.on('data', (chunk) => {
    stderr += chunk.toString();
  });

  let cdp: CdpConnection | undefined;

  try {
    const webSocketUrl = await waitForDevTools(devToolsPort, chromeProcess, options.timeoutMs);
    cdp = new CdpConnection(webSocketUrl);

    const { targetId } = await cdp.send<{ targetId: string }>('Target.createTarget', { url: 'about:blank' });
    const { sessionId } = await cdp.send<{ sessionId: string }>('Target.attachToTarget', {
      targetId,
      flatten: true,
    });

    await cdp.send('Page.enable', {}, sessionId);
    await cdp.send('Runtime.enable', {}, sessionId);
    await cdp.send('Emulation.setEmulatedMedia', { media: 'print' }, sessionId);

    const loaded = cdp.waitForEvent(sessionId, 'Page.loadEventFired', options.timeoutMs);
    const navigation = await cdp.send<{ errorText?: string }>('Page.navigate', { url: pageUrl }, sessionId);
    if (navigation.errorText) {
      throw new Error(`Navigation failed: ${navigation.errorText}`);
    }
    await loaded;

    await waitForResumeReady(cdp, sessionId, options.timeoutMs);
    await waitForPageAssets(cdp, sessionId, options.timeoutMs);
    if (options.waitMs > 0) {
      await sleep(options.waitMs);
    }

    const pdf = await cdp.send<{ data: string }>(
      'Page.printToPDF',
      {
        printBackground: true,
        preferCSSPageSize: true,
        paperWidth: A4.widthInches,
        paperHeight: A4.heightInches,
        marginTop: 0,
        marginRight: 0,
        marginBottom: 0,
        marginLeft: 0,
        scale: 1,
      },
      sessionId,
    );

    await mkdir(path.dirname(outputPath), { recursive: true });
    await writeFile(outputPath, Buffer.from(pdf.data, 'base64'));
    console.log(`Rendered ${options.input} -> ${path.relative(process.cwd(), outputPath)}`);
  } catch (error) {
    if (stderr.trim()) {
      console.error(stderr.trim());
    }
    throw error;
  } finally {
    if (cdp) {
      try {
        await cdp.send('Browser.close');
      } catch {
        cdp.close();
      }
    }

    await waitForProcessExit(chromeProcess, 1500);
    if (chromeProcess.exitCode === null) {
      chromeProcess.kill('SIGTERM');
      await waitForProcessExit(chromeProcess, 1500);
    }

    await staticServer?.close();
    await removeDirectoryWithRetries(userDataDir);
  }
}

async function main() {
  const options = parseArgs(process.argv.slice(2));

  if (options.help) {
    console.log(usage());
    return;
  }

  await renderPdf(options);
}

main().catch((error: unknown) => {
  const message = error instanceof Error ? error.message : String(error);
  console.error(`render-pdf: ${message}`);
  process.exitCode = 1;
});
