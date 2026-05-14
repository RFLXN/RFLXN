import { Container } from "@/components/container";

type PageIndicatorItem = { id: string, index: string, label: string };
type PageIndicatorProps = { items: PageIndicatorItem[], activeId: string, onSelect(id: string): void };

function PageIndicator({ items, activeId, onSelect }: PageIndicatorProps) {
  return (
    <Container className="pointer-events-none fixed inset-x-0 bottom-0 z-30 pb-[max(1rem,env(safe-area-inset-bottom))]">
      <nav
        aria-label="Portfolio page indicator"
        className="pointer-events-auto mx-auto grid w-full max-w-[40rem] grid-cols-4 gap-1 rounded-[0.75rem] border border-app-border bg-app-surface-overlay p-1 shadow-[0_12px_30px_rgba(0,0,0,0.28)] backdrop-blur-md"
      >
        {items.map(item => {
          const isActive = item.id === activeId;
          const buttonClassName = isActive
            ? "flex min-w-0 cursor-pointer select-none items-center justify-center gap-1.5 rounded-[0.6rem] border border-app-accent-border bg-app-accent-soft px-2 py-1.5 text-app-text-strong transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-app-focus sm:px-2.5"
            : "flex min-w-0 cursor-pointer select-none items-center justify-center gap-1.5 rounded-[0.6rem] border border-transparent px-2 py-1.5 text-app-text-muted transition-colors duration-200 hover:border-app-border hover:bg-app-surface hover:text-app-text-strong focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-app-focus-neutral sm:px-2.5";
          const indexClassName = isActive
            ? "text-app-accent"
            : "text-app-text-faint";

          return (
            <button
              key={item.id}
              type="button"
              aria-current={isActive ? "page" : undefined}
              onClick={() => onSelect(item.id)}
              className={buttonClassName}
            >
              <span className={`shrink-0 text-[9px] font-medium tracking-[0.24em] ${indexClassName}`}>
                {item.index}
              </span>

              <span className="whitespace-nowrap text-left text-[8px] font-medium uppercase tracking-[0.08em] sm:text-[10px] sm:tracking-[0.14em]">
                {item.label}
              </span>
            </button>
          );
        })}
      </nav>
    </Container>
  );
}

export { PageIndicator };
