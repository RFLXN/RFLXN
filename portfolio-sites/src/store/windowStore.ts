import { create } from "zustand";
import { emptyState, reducer } from "./windowState";
import type { Action, DesktopState } from "./windowState";

export interface WindowStore {
  desktop: DesktopState;
  dispatch: (action: Action) => void;
}
export const useWindowStore = create<WindowStore>((set) => ({
  desktop: emptyState,
  dispatch: (action) =>
    set((store) => {
      const desktop = reducer(store.desktop, action);
      return desktop === store.desktop ? store : { desktop };
    }),
}));
