import type { PropsWithChildren } from "react";

type PageFooterProps = PropsWithChildren;

function PageFooter({ children }: PageFooterProps) {
  if (!children) return null;

  return (
    <div className="space-y-3">
      {children}
    </div>
  );
}

export { PageFooter };
