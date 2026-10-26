export interface Bounds {
  x: number;
  y: number;
  width: number;
  height: number;
}
export interface WindowState {
  appId: string;
  openedOrder: number;
  bounds: Bounds;
  minimized: boolean;
  maximized: boolean;
}
export interface DesktopState {
  windows: WindowState[];
  activeId: string | null;
}
export type Action =
  | { type: "open"; appId: string; bounds: Bounds }
  | { type: "focus" | "minimize" | "maximize" | "close"; appId: string }
  | { type: "bounds"; appId: string; bounds: Bounds };
export const emptyState: DesktopState = { windows: [], activeId: null };
export function indicatorWindows(state: DesktopState): WindowState[] {
  return [...state.windows].sort((a, b) => a.openedOrder - b.openedOrder);
}
export function fitBounds(b: Bounds, width: number, height: number): Bounds {
  const w = Math.min(Math.max(300, b.width), width);
  const h = Math.min(Math.max(260, b.height), height);
  return {
    width: w,
    height: h,
    x: Math.max(0, Math.min(b.x, width - w)),
    y: Math.max(0, Math.min(b.y, height - h)),
  };
}
export function reducer(state: DesktopState, action: Action): DesktopState {
  const target = state.windows.find((w) => w.appId === action.appId);
  if (action.type === "open" || action.type === "focus") {
    if (!target && action.type === "focus") return state;
    const window = target
      ? { ...target, minimized: false }
      : {
          appId: action.appId,
          openedOrder:
            Math.max(-1, ...state.windows.map((w) => w.openedOrder)) + 1,
          bounds: (action as Extract<Action, { type: "open" }>).bounds,
          minimized: false,
          maximized: false,
        };
    return {
      windows: [
        ...state.windows.filter((w) => w.appId !== action.appId),
        window,
      ],
      activeId: action.appId,
    };
  }
  if (!target) return state;
  if (
    action.type === "bounds" &&
    Object.keys(action.bounds).every(
      (key) =>
        action.bounds[key as keyof Bounds] ===
        target.bounds[key as keyof Bounds],
    )
  )
    return state;
  let windows = state.windows;
  if (action.type === "close")
    windows = windows.filter((w) => w.appId !== action.appId);
  else
    windows = windows.map((w) =>
      w.appId !== action.appId
        ? w
        : action.type === "minimize"
          ? { ...w, minimized: true }
          : action.type === "maximize"
            ? { ...w, maximized: !w.maximized }
            : action.type === "bounds"
              ? { ...w, bounds: action.bounds }
              : w,
    );
  const activeId = windows.some(
    (w) => w.appId === state.activeId && !w.minimized,
  )
    ? state.activeId
    : ([...windows].reverse().find((w) => !w.minimized)?.appId ?? null);
  return { windows, activeId };
}
