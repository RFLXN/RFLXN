import { create } from "zustand";

interface VisitState {
  introShown: boolean;
  markIntroShown: () => void;
}
// Page-local state: each load gets one automatic launch after boot.
// Intentionally ignore the legacy rflxn-visit localStorage entry.
export const useVisitStore = create<VisitState>((set) => ({
  introShown: false,
  markIntroShown: () => set({ introShown: true }),
}));
