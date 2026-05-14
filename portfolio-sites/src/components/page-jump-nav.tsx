type PageJumpNavItem = {
  id: string,
  label: string
};

type PageJumpNavProps = {
  items: PageJumpNavItem[],
  onSelect(id: string): void
};

function PageJumpNav({ items, onSelect }: PageJumpNavProps) {
  return (
    <nav
      aria-label="Jump to portfolio section"
      className="flex flex-wrap justify-center gap-2.5"
    >
      {items.map(item => (
        <button
          key={item.id}
          type="button"
          onClick={() => onSelect(item.id)}
          className="inline-flex cursor-pointer select-none items-center justify-center rounded-[0.85rem] border border-app-border bg-app-surface-strong px-3 py-2 text-center transition-colors duration-200 hover:border-app-accent-border hover:bg-app-accent-soft focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-app-focus-neutral"
        >
          <span className="text-center text-xs font-medium uppercase tracking-[0.14em] text-app-text-strong">
            {item.label}
          </span>
        </button>
      ))}
    </nav>
  );
}

export { PageJumpNav };
