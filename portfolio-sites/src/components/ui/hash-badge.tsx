import type { ReactNode } from "react";

type HashBadgeProps = {
  label: ReactNode,
  className?: string
};

const baseClassName = "inline-flex items-center gap-1 rounded-full border border-app-accent-border bg-app-accent-soft px-3 py-1 text-[10px] font-medium tracking-[0.16em] text-app-text-strong sm:text-xs";

function HashBadge({ label, className }: HashBadgeProps) {
  const combinedClassName = className
    ? `${baseClassName} ${className}`
    : baseClassName;

  return (
    <span className={combinedClassName}>
      <span className="text-app-accent">#</span>
      <span>{label}</span>
    </span>
  );
}

export { HashBadge };
