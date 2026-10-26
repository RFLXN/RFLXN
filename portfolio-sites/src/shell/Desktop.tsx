import { TextSizeWidget } from "./TextSizeWidget";
import { useContentStore } from "../store/contentStore";
import type { AppTarget } from "../content/portfolio";
import { AppIcon } from "../apps/AppIcon";
import { useCallback, useEffect, useRef, useState } from "react";
import type { PointerEvent } from "react";
import {
  Command,
  Minus,
  Square,
  Copy,
  X,
  ArrowUpRight,
  Github,
} from "lucide-react";
import { apps } from "../apps/registry";
import { fitBounds, indicatorWindows } from "../store/windowState";
import { useAnimatedWindows } from "./useAnimatedWindows";
import type { Bounds } from "../store/windowState";
import { useWindowStore } from "../store/windowStore";
import { createWindowGesture } from "./windowGesture";
import { useBootStore } from "../store/bootStore";
import { useVisitStore } from "../store/visitStore";

function Clock() {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);
  return (
    <time className="clock" dateTime={now.toISOString()}>
      <span>
        {now.getFullYear()}-{String(now.getMonth() + 1).padStart(2, "0")}-
        {String(now.getDate()).padStart(2, "0")}
      </span>
      <span>
        {now.toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        })}
      </span>
    </time>
  );
}
export function Desktop() {
  const { state, dispatch, windows, icons, emptySlot } = useAnimatedWindows();
  const area = useRef<HTMLElement>(null);
  const bootReady = useBootStore((store) => store.phase === "ready");
  const introShown = useVisitStore((store) => store.introShown);
  const active = apps.find((app) => app.id === state.activeId);
  const [gesture] = useState(() =>
    createWindowGesture({
      viewport: () => ({
        width: area.current!.clientWidth,
        height: area.current!.clientHeight,
      }),
      commit: (appId, bounds) =>
        useWindowStore.getState().dispatch({ type: "bounds", appId, bounds }),
      requestFrame: (callback) => requestAnimationFrame(callback),
      cancelFrame: (id) => cancelAnimationFrame(id),
    }),
  );
  const open = useCallback(
    (appId: string) => {
      const app = apps.find((a) => a.id === appId);
      if (!app) return;
      const rect = area.current!.getBoundingClientRect();
      const offset = useWindowStore.getState().desktop.windows.length * 28;
      dispatch({
        type: "open",
        appId,
        bounds: fitBounds(
          {
            ...app.initialSize,
            x: (rect.width - app.initialSize.width) / 2 + offset,
            y: (rect.height - app.initialSize.height) / 2 - 20 + offset,
          },
          rect.width,
          rect.height,
        ),
      });
    },
    [dispatch],
  );
  const openApp = useCallback(
    (target: AppTarget) => {
      useContentStore.getState().navigate(target);
      open(target.appId);
    },
    [open],
  );
  useEffect(() => {
    if (
      !bootReady ||
      useVisitStore.getState().introShown ||
      !apps.some((app) => app.id === "intro")
    )
      return;
    // Mark first to prevent StrictMode or another render from opening it twice.
    useVisitStore.getState().markIntroShown();
    open("intro");
  }, [bootReady, introShown, open]);
  useEffect(() => {
    let width = -1,
      height = -1;
    const observer = new ResizeObserver(([entry]) => {
      const next = entry.contentRect;
      if (next.width === width && next.height === height) return;
      width = next.width;
      height = next.height;
      gesture.finish();
      const store = useWindowStore.getState();
      for (const w of store.desktop.windows)
        store.dispatch({
          type: "bounds",
          appId: w.appId,
          bounds: fitBounds(w.bounds, width, height),
        });
    });
    if (area.current) observer.observe(area.current);
    window.addEventListener("blur", gesture.finish);
    return () => {
      observer.disconnect();
      window.removeEventListener("blur", gesture.finish);
      gesture.dispose();
    };
  }, [gesture]);
  const start = (
    e: PointerEvent,
    appId: string,
    kind: string,
    bounds: Bounds,
    maximized: boolean,
  ) => {
    if (
      e.button !== 0 ||
      !e.isPrimary ||
      maximized ||
      (e.target as Element).closest("button")
    )
      return;
    const element = windows.current.get(appId);
    if (!element || element.inert) return;
    e.preventDefault();
    e.currentTarget.setPointerCapture(e.pointerId);
    gesture.begin(
      appId,
      kind,
      element,
      e.pointerId,
      e.clientX,
      e.clientY,
      bounds,
    );
  };
  const move = (e: PointerEvent) =>
    gesture.move(e.pointerId, e.clientX, e.clientY);
  const end = (e: PointerEvent) => {
    move(e);
    gesture.finish();
  };
  return (
    <div className="desktop-shell">
      <header className="topbar">
        <div className="current-window">
          {active ? (
            <>
              <AppIcon icon={active.icon} size={16} />
              <span>{active.title}</span>
            </>
          ) : (
            <>
              <Command size={15} />
              <span>Desktop</span>
            </>
          )}
        </div>
        <div className="bar-center">
          <nav
            className="running-apps"
            aria-label="실행 중인 앱"
            style={{
              width: Math.max(
                50,
                14 +
                  Math.max(1, state.windows.length) * 30 +
                  Math.max(0, state.windows.length - 1) * 4,
              ),
            }}
          >
            {state.windows.length ? (
              indicatorWindows(state).map((w) => {
                const app = apps.find((a) => a.id === w.appId)!;
                return (
                  <button
                    key={w.appId}
                    ref={(node) => {
                      if (node) icons.current.set(w.appId, node);
                      else icons.current.delete(w.appId);
                    }}
                    title={`${app.title}${w.minimized ? " 복원" : " 창으로 이동"}`}
                    aria-label={`${app.title} 창으로 이동`}
                    aria-pressed={state.activeId === w.appId}
                    className={`running${state.activeId === w.appId ? " active" : ""}${w.minimized ? " minimized" : ""}`}
                    onClick={() => dispatch({ type: "focus", appId: w.appId })}
                  >
                    <span className="running-icon">
                      <AppIcon icon={app.icon} size={22} />
                    </span>
                  </button>
                );
              })
            ) : (
              <span
                ref={emptySlot}
                className="no-windows"
                title="열린 창이 없습니다"
              >
                <span />
              </span>
            )}
          </nav>
          <Clock />
        </div>
        <div className="bar-right">
          <TextSizeWidget />
          <a
            className="bar-brand"
            href="https://github.com/rflxn"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="rflxn GitHub 프로필 (새 탭)"
            title="GitHub 프로필 · 새 탭"
          >
            <Github size={17} aria-hidden="true" />
            <span>RFLXN</span>
          </a>
        </div>
      </header>
      <main className="desktop" ref={area} aria-label="바탕화면">
        <div className="wallpaper" aria-hidden="true" />
        <div className="desktop-apps">
          {apps.map((app) => (
            <button
              className="desktop-shortcut"
              key={app.id}
              onClick={() => open(app.id)}
              title={app.description}
            >
              <span className="app-icon">
                <AppIcon icon={app.icon} size={48} />
                <span className="shortcut-arrow">
                  <ArrowUpRight size={10} />
                </span>
              </span>
              <span>{app.title}</span>
              <span className="shortcut-description">{app.description}</span>
            </button>
          ))}
        </div>
        {state.windows.map((w, index) => {
          const app = apps.find((a) => a.id === w.appId)!;
          const Component = app.component;
          return (
            <section
              ref={(node) => {
                if (node) windows.current.set(w.appId, node);
                else windows.current.delete(w.appId);
              }}
              key={w.appId}
              hidden={w.minimized}
              role="dialog"
              aria-label={app.title}
              className={`window ${state.activeId === w.appId ? "focused" : ""} ${w.maximized ? "maximized" : ""}`}
              style={{
                left: w.maximized ? 0 : w.bounds.x,
                top: w.maximized ? 0 : w.bounds.y,
                width: w.maximized ? "100%" : w.bounds.width,
                height: w.maximized ? "100%" : w.bounds.height,
                zIndex: index + 10,
              }}
              onPointerDownCapture={() => {
                if (!w.minimized && state.activeId !== w.appId)
                  dispatch({ type: "focus", appId: w.appId });
              }}
              onFocusCapture={() => {
                if (!w.minimized && state.activeId !== w.appId)
                  dispatch({ type: "focus", appId: w.appId });
              }}
            >
              <div
                className="window-titlebar"
                onPointerDown={(e) =>
                  start(e, w.appId, "move", w.bounds, w.maximized)
                }
                onPointerMove={move}
                onPointerUp={end}
                onPointerCancel={gesture.finish}
                onLostPointerCapture={gesture.finish}
                onDoubleClick={(e) => {
                  if (!(e.target as HTMLElement).closest("button"))
                    dispatch({ type: "maximize", appId: w.appId });
                }}
              >
                <span className="window-title">
                  <AppIcon icon={app.icon} size={16} />
                  {app.title}
                </span>
                <div className="window-controls">
                  <button
                    aria-label="최소화"
                    title="최소화"
                    onClick={() =>
                      dispatch({ type: "minimize", appId: w.appId })
                    }
                  >
                    <Minus size={15} />
                  </button>
                  <button
                    aria-label={w.maximized ? "이전 크기로 복원" : "최대화"}
                    title={w.maximized ? "이전 크기로 복원" : "최대화"}
                    onClick={() =>
                      dispatch({ type: "maximize", appId: w.appId })
                    }
                  >
                    {w.maximized ? <Copy size={13} /> : <Square size={12} />}
                  </button>
                  <button
                    className="close"
                    aria-label="닫기"
                    title="닫기"
                    onClick={() => dispatch({ type: "close", appId: w.appId })}
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>
              <div className="window-content">
                <Component
                  openApp={openApp}
                  icon={app.icon}
                  close={() => dispatch({ type: "close", appId: w.appId })}
                />
              </div>
              {!w.maximized &&
                ["n", "e", "s", "w", "ne", "se", "sw", "nw"].map((dir) => (
                  <div
                    aria-hidden="true"
                    key={dir}
                    className={`resize-handle resize-${dir}`}
                    onPointerDown={(e) =>
                      start(e, w.appId, dir, w.bounds, false)
                    }
                    onPointerMove={move}
                    onPointerUp={end}
                    onPointerCancel={gesture.finish}
                    onLostPointerCapture={gesture.finish}
                  />
                ))}
            </section>
          );
        })}
      </main>
    </div>
  );
}
