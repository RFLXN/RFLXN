import { fitBounds } from "../store/windowState";
import type { Bounds } from "../store/windowState";

export function gestureBounds(
  start: Bounds,
  kind: string,
  dx: number,
  dy: number,
  width: number,
  height: number,
): Bounds {
  if (kind === "move")
    return fitBounds(
      { ...start, x: start.x + dx, y: start.y + dy },
      width,
      height,
    );
  const minWidth = Math.min(300, width),
    minHeight = Math.min(260, height);
  let left = start.x,
    top = start.y,
    right = left + start.width,
    bottom = top + start.height;
  if (kind.includes("w"))
    left = Math.max(0, Math.min(left + dx, right - minWidth));
  if (kind.includes("e"))
    right = Math.min(width, Math.max(right + dx, left + minWidth));
  if (kind.includes("n"))
    top = Math.max(0, Math.min(top + dy, bottom - minHeight));
  if (kind.includes("s"))
    bottom = Math.min(height, Math.max(bottom + dy, top + minHeight));
  return { x: left, y: top, width: right - left, height: bottom - top };
}

interface GestureHost {
  viewport: () => { width: number; height: number };
  commit: (appId: string, bounds: Bounds) => void;
  requestFrame: (callback: FrameRequestCallback) => number;
  cancelFrame: (id: number) => void;
}
interface Session {
  appId: string;
  kind: string;
  element: HTMLElement;
  pointerId: number;
  x: number;
  y: number;
  bounds: Bounds;
  latest: Bounds;
  viewport: { width: number; height: number };
}
/** Pointer events only update pending geometry. No React/store work until release. */
export function createWindowGesture(host: GestureHost) {
  let session: Session | null = null;
  let frame: number | null = null;
  const paint = () => {
    frame = null;
    if (!session) return;
    const { element, latest, bounds, kind } = session;
    if (kind === "move") {
      element.style.translate = `${latest.x - bounds.x}px ${latest.y - bounds.y}px`;
    } else {
      element.style.left = `${latest.x}px`;
      element.style.top = `${latest.y}px`;
      element.style.width = `${latest.width}px`;
      element.style.height = `${latest.height}px`;
    }
  };
  const clearFrame = () => {
    if (frame !== null) host.cancelFrame(frame);
    frame = null;
  };
  const finish = () => {
    if (!session) return;
    clearFrame();
    const { element, latest, appId } = session;
    session = null;
    // Swap the compositor translation for final layout in the same task, before paint.
    element.style.left = `${latest.x}px`;
    element.style.top = `${latest.y}px`;
    element.style.width = `${latest.width}px`;
    element.style.height = `${latest.height}px`;
    element.style.translate = "";
    element.style.willChange = "";
    host.commit(appId, latest);
  };
  return {
    begin(
      appId: string,
      kind: string,
      element: HTMLElement,
      pointerId: number,
      x: number,
      y: number,
      bounds: Bounds,
    ) {
      finish();
      // Finish entrance transforms before the user directly manipulates the window.
      for (const animation of element.getAnimations()) animation.cancel();
      session = {
        appId,
        kind,
        element,
        pointerId,
        x,
        y,
        bounds,
        latest: bounds,
        viewport: host.viewport(),
      };
      if (kind === "move") element.style.willChange = "translate";
    },
    move(pointerId: number, x: number, y: number) {
      if (!session || session.pointerId !== pointerId) return;
      const { bounds, kind, viewport } = session;
      session.latest = gestureBounds(
        bounds,
        kind,
        x - session.x,
        y - session.y,
        viewport.width,
        viewport.height,
      );
      if (frame === null) frame = host.requestFrame(paint);
    },
    finish,
    dispose() {
      clearFrame();
      if (session) {
        session.element.style.translate = "";
        session.element.style.willChange = "";
      }
      session = null;
    },
  };
}
