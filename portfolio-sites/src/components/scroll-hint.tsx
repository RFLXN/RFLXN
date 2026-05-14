import { ArrowDown } from "lucide-react";

import { homePageId } from "@/lib/page-id";
import { pageStore } from "@/stores/page";

type ScrollHintProps = { variant?: "fixed" | "inline" };

function ScrollHint({ variant = "fixed" }: ScrollHintProps) {
  const currentPageId = pageStore(state => state.currentPageId);
  const isHomePage = currentPageId === homePageId;

  if (variant === "fixed" && isHomePage) return null;
  if (variant === "inline" && !isHomePage) return null;

  const wrapperClassName = variant === "fixed"
    ? "pointer-events-none fixed inset-x-0 bottom-20 z-20 flex justify-center sm:bottom-24"
    : "flex justify-center";

  return (
    <div className={wrapperClassName}>
      <div className="flex items-center gap-2 rounded-full border border-app-border bg-app-surface-overlay px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.2em] text-app-text-muted backdrop-blur-md sm:text-xs">
        <span>아래로 스크롤</span>
        <ArrowDown className="size-3 animate-bounce sm:size-3.5" />
      </div>
    </div>
  );
}

export { ScrollHint };
