import { ArrowUp } from "lucide-react";

import { homePageId } from "@/lib/page-id";
import { pageStore } from "@/stores/page";

function GoTopButton() {
  const selectPage = pageStore(state => state.selectPage);

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-20 z-20 flex justify-center sm:bottom-24">
      <button
        type="button"
        onClick={() => selectPage(homePageId)}
        className="pointer-events-auto flex items-center gap-2 rounded-full border border-app-border bg-app-surface-overlay px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.2em] text-app-text-muted backdrop-blur-md transition-colors hover:border-app-border-strong hover:text-app-text-strong focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-app-focus-neutral sm:text-xs"
      >
        <span>맨 위로</span>
        <ArrowUp className="size-3 sm:size-3.5" />
      </button>
    </div>
  );
}

export { GoTopButton };
