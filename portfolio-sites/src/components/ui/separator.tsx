import type { HTMLAttributes } from "react";

type SeparatorProps = HTMLAttributes<HTMLDivElement> & {
  orientation?: "horizontal" | "vertical",
  decorative?: boolean
};

function Separator({
  className,
  orientation = "horizontal",
  decorative = true,
  ...props
}: SeparatorProps) {
  const baseClassName = orientation === "horizontal"
    ? "shrink-0 bg-app-border h-px w-full"
    : "shrink-0 bg-app-border h-full w-px";
  const combinedClassName = className
    ? `${baseClassName} ${className}`
    : baseClassName;

  return (
    <div
      role={decorative ? "none" : "separator"}
      aria-orientation={orientation}
      className={combinedClassName}
      {...props}
    />
  );
}

export { Separator };
