import { useCallback, useLayoutEffect, useRef } from "react";
import { emptyState } from "../store/windowState";
import { useWindowStore } from "../store/windowStore";
import type { Action, DesktopState } from "../store/windowState";

const easing = "cubic-bezier(.2,.8,.2,1)";
const reducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Keep exiting windows mounted until their animation finishes. Cancel stale exits on reopen. */
export function useAnimatedWindows() {
  const state = useWindowStore((store) => store.desktop);
  const commit = useWindowStore((store) => store.dispatch);
  const windows = useRef(new Map<string, HTMLElement>());
  const icons = useRef(new Map<string, HTMLElement>());
  const emptySlot = useRef<HTMLSpanElement>(null);
  const previous = useRef<DesktopState>(emptyState);
  const exits = useRef(new Map<string, object>());
  const animations = useRef(new Map<HTMLElement, Animation>());

  const animate = useCallback(
    (
      element: HTMLElement | undefined | null,
      frames: Keyframe[],
      duration = 220,
      holdFinalFrame = false,
    ) => {
      if (!element) return Promise.resolve();
      animations.current.get(element)?.cancel();
      if (reducedMotion()) return Promise.resolve();
      const animation = element.animate(frames, {
        duration,
        easing,
        fill: holdFinalFrame ? "forwards" : "none",
      });
      animations.current.set(element, animation);
      return animation.finished
        .catch(() => {})
        .finally(() => {
          if (!holdFinalFrame && animations.current.get(element) === animation)
            animations.current.delete(element);
        });
    },
    [],
  );

  const dispatch = useCallback(
    (action: Action) => {
      const id = action.appId;
      const element = windows.current.get(id);
      const icon = icons.current.get(id);
      if (action.type === "close" || action.type === "minimize") {
        if (exits.current.has(id)) return;
        const token = {};
        exits.current.set(id, token);
        if (element) element.inert = true;
        const minimizing = action.type === "minimize";
        // The origin follows the app's actual top-bar position, including narrow viewports.
        if (element && icon) {
          const a = element.getBoundingClientRect(),
            b = icon.getBoundingClientRect();
          element.style.transformOrigin = minimizing
            ? `${b.x + b.width / 2 - a.x}px ${b.y + b.height / 2 - a.y}px`
            : "50% 50%";
        }
        const finish = animate(
          element,
          [
            { opacity: 1, transform: "scale(1)" },
            { opacity: 0, transform: minimizing ? "scale(.78)" : "scale(.96)" },
          ],
          minimizing ? 260 : 180,
          true,
        );
        void animate(
          icon,
          minimizing
            ? [
                { transform: "scale(1)" },
                { transform: "scale(.82)", offset: 0.45 },
                { transform: "scale(1)" },
              ]
            : [
                { opacity: 1, transform: "scale(1)" },
                { opacity: 0, transform: "scale(.6)" },
              ],
          minimizing ? 260 : 180,
          !minimizing,
        );
        void finish.then(() => {
          if (exits.current.get(id) !== token) return;
          exits.current.delete(id);
          commit(action);
        });
        return;
      }
      if (action.type === "open" || action.type === "focus") {
        if (exits.current.delete(id)) {
          if (element) element.inert = false;
          void animate(element, [
            { opacity: 0.5, transform: "scale(.96)" },
            { opacity: 1, transform: "scale(1)" },
          ]);
          void animate(icon, [{ opacity: 0.5 }, { opacity: 1 }]);
        }
      }
      commit(action);
    },
    [animate, commit],
  );

  useLayoutEffect(() => {
    // Release held exit frames only after React has hidden/removed their DOM.
    // Doing this in animation.finished would expose the original opacity for a frame.
    for (const [element, animation] of animations.current) {
      if (!element.isConnected || element.hidden) {
        animation.cancel();
        animations.current.delete(element);
        element.inert = false;
      }
    }
    for (const w of state.windows) {
      const mountedWindow = windows.current.get(w.appId);
      if (w.minimized && mountedWindow) mountedWindow.inert = false;
      const before = previous.current.windows.find(
        (item) => item.appId === w.appId,
      );
      if (!w.minimized && (!before || before.minimized)) {
        const element = windows.current.get(w.appId);
        if (element) element.style.transformOrigin = "50% 35%";
        void animate(
          element,
          [
            { opacity: 0, transform: "translateY(10px) scale(.96)" },
            { opacity: 1, transform: "translateY(0) scale(1)" },
          ],
          260,
        );
        void animate(
          icons.current.get(w.appId),
          [
            { opacity: 0.2, transform: "translateY(5px) scale(.65)" },
            { opacity: 1, transform: "translateY(0) scale(1)" },
          ],
          260,
        );
      }
    }
    if (!state.windows.length && previous.current.windows.length) {
      void animate(emptySlot.current, [
        { opacity: 0, transform: "scale(.65)" },
        { opacity: 1, transform: "scale(1)" },
      ]);
    }
    previous.current = state;
  }, [state, animate]);

  useLayoutEffect(
    () => () => {
      exits.current.clear();
      for (const animation of animations.current.values()) animation.cancel();
      animations.current.clear();
    },
    [],
  );

  return { state, dispatch, windows, icons, emptySlot };
}
