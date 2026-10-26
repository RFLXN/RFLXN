import { useEffect, useRef } from "react";
import type { ReactNode } from "react";
import { bootConfig, delay, logBadge, useBootStore } from "../store/bootStore";
import "./boot.css";

export function BootScreen({ children }: { children: ReactNode }) {
  const { phase, visibleCount, completedCount, advance, skip, complete } =
    useBootStore();
  const log = useRef<HTMLDivElement>(null);
  const skipButton = useRef<HTMLButtonElement>(null);
  const desktop = useRef<HTMLDivElement>(null);
  const restoreFocus = useRef(false);

  useEffect(() => {
    if (phase === "ready") {
      if (restoreFocus.current) desktop.current?.focus({ preventScroll: true });
      return;
    }
    const duration =
      phase === "booting"
        ? bootConfig.logs[visibleCount - 1].durationMs
        : window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? 0
          : bootConfig.transitionMs;
    const timer = window.setTimeout(() => {
      if (phase === "leaving") {
        restoreFocus.current = document.activeElement === skipButton.current;
        complete();
      } else advance();
    }, delay(duration));
    return () => window.clearTimeout(timer);
  }, [phase, visibleCount, advance, complete]);

  useEffect(() => {
    if (log.current) log.current.scrollTop = log.current.scrollHeight;
  }, [visibleCount]);

  useEffect(() => {
    if (phase !== "booting") return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") skip();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [phase, skip]);

  return (
    <>
      <div
        ref={desktop}
        className="boot-desktop"
        tabIndex={-1}
        inert={phase !== "ready"}
        aria-hidden={phase !== "ready"}
      >
        {children}
      </div>
      {phase !== "ready" && (
        <section
          className={`boot-screen ${phase === "leaving" ? "boot-leaving" : ""}`}
          aria-label="데스크톱 부팅"
        >
          <header className="boot-header">
            <pre
              className="boot-logo"
              role="img"
              aria-label={bootConfig.titleLabel ?? "Boot logo"}
            >
              {Array.isArray(bootConfig.title)
                ? bootConfig.title.join("\n")
                : bootConfig.title}
            </pre>
            <span>{bootConfig.subtitle}</span>
          </header>
          <div
            className="boot-log"
            ref={log}
            role="log"
            aria-label="부팅 로그"
            aria-live="off"
          >
            {bootConfig.logs.slice(0, visibleCount).map((line, index) => (
              <div className="boot-line" key={index}>
                {line.type !== "plain" && (
                  <span
                    className={`boot-badge ${index < completedCount ? `boot-${line.type}` : "boot-pending"}`}
                  >
                    {logBadge(line.type, index < completedCount)}
                  </span>
                )}
                {line.text || "\u00a0"}
              </div>
            ))}
            <span className="boot-cursor" aria-hidden="true">
              ▌
            </span>
          </div>
          <footer className="boot-footer">
            <span role="status">
              {phase === "leaving" ? "Starting desktop…" : "Starting session…"}
            </span>
            <button
              ref={skipButton}
              onClick={skip}
              disabled={phase === "leaving"}
            >
              건너뛰기 <kbd>Esc</kbd>
            </button>
          </footer>
        </section>
      )}
    </>
  );
}
