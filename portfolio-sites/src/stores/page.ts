import { create } from "zustand";

import { homePageId } from "@/lib/page-id";

type PageStore = {
  currentPageId: string,
  setCurrentPageId(id: string): void,
  resetCurrentPage(): void,
  selectPage(id: string): void
};

const pageStore = create<PageStore>()(set => ({
  currentPageId: homePageId,
  setCurrentPageId: currentPageId => set({ currentPageId }),
  resetCurrentPage: () => set({ currentPageId: homePageId }),
  selectPage: currentPageId => {
    const section = document.getElementById(currentPageId);

    if (!section) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    set({ currentPageId });
    section.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth", block: "start" });
  }
}));

export { pageStore };
export type { PageStore };
