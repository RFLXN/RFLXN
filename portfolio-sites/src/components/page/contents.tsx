import type { PropsWithChildren } from "react";

type PageContentsProps = PropsWithChildren<{ className?: string }>;

const baseClassName = "relative overflow-hidden rounded-[1.1rem] border border-app-accent-border bg-[linear-gradient(135deg,var(--app-accent-soft),var(--app-surface)_34%,transparent_78%)] p-6 backdrop-blur-sm sm:p-7";

function PageContents({ children, className }: PageContentsProps) {
  const combinedClassName = className
    ? `${baseClassName} ${className}`
    : baseClassName;

  return (
    <div className={combinedClassName}>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1 bg-app-accent" />

      <div className="relative pl-3">
        {children}
      </div>
    </div>
  );
}

export { PageContents };
