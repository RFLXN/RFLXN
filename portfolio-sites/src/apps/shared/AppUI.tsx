import { useLayoutEffect, useRef, type ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
export function ExternalLink({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <a
      className="content-link"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
      <ArrowUpRight size={13} aria-hidden="true" />
      <span className="sr-only"> (새 탭)</span>
    </a>
  );
}
export function AppLayout({
  label,
  pageKey,
  sidebar,
  children,
}: {
  label?: string;
  pageKey: string;
  sidebar: ReactNode;
  children: ReactNode;
}) {
  const root = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    root.current?.querySelector(".app-detail")?.scrollTo({ top: 0 });
  }, [pageKey]);
  return (
    <div className="content-app" ref={root}>
      <aside className="app-sidebar">
        {label && <div className="sidebar-label">{label}</div>}
        <nav aria-label={label ?? "콘텐츠 목록"}>{sidebar}</nav>
      </aside>
      <article className="app-detail">{children}</article>
    </div>
  );
}
export function NavItem({
  title,
  caption,
  active,
  onClick,
}: {
  title: string;
  caption: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      className={`content-nav ${active ? "selected" : ""}`}
      aria-pressed={active}
      onClick={onClick}
    >
      <strong>{title}</strong>
      <span>{caption}</span>
    </button>
  );
}
export function Heading({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children?: ReactNode;
}) {
  return (
    <header className="content-heading">
      <span className="eyebrow">{eyebrow}</span>
      <h1>{title}</h1>
      {children && <p>{children}</p>}
    </header>
  );
}
export function SampleLabel({
  children = "브라우저 안에서만 동작하는 샘플 체험입니다.",
}: {
  children?: ReactNode;
}) {
  return (
    <p className="sample-label">
      <span className="status-dot" />
      {children}
    </p>
  );
}
