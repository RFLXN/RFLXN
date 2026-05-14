import type { PropsWithChildren } from "react";

type ContainerProps = PropsWithChildren<{ className?: string }>;

const baseClassName = "mx-auto w-full max-w-6xl px-5 sm:px-8 lg:px-10";

function Container({ children, className }: ContainerProps) {
  const combinedClassName = className
    ? `${baseClassName} ${className}`
    : baseClassName;

  return <div className={combinedClassName}>{children}</div>;
}

export { Container };
