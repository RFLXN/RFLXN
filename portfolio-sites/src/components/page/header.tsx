type PageHeaderProps = {
  title?: string,
  subtitle?: string
};

function PageHeader({ title = "", subtitle }: PageHeaderProps) {
  return (
    <div className="flex flex-wrap items-end gap-x-4 gap-y-2">
      <div className="min-w-0 max-w-3xl">
        <h2 className="text-4xl font-semibold tracking-[-0.05em] text-app-text-strong sm:text-5xl lg:text-6xl">
          {title}
        </h2>
      </div>

      {subtitle ? (
        <p className="pb-1 text-sm font-medium uppercase tracking-[0.22em] text-app-text-subtle sm:text-base">
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}

export { PageHeader };
