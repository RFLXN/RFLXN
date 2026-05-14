import { Container } from "@/components/container";
import { SvgIcon } from "@/components/ui/svg-icon";

type FixedHeaderProps = { onHomeClick(): void };
const githubUrl = "https://github.com/RFLXN";

function FixedHeader({ onHomeClick }: FixedHeaderProps) {
  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-app-border bg-app-header backdrop-blur-md">
      <div className="pt-[env(safe-area-inset-top)]">
        <Container className="flex h-11 items-center justify-between gap-3 sm:h-12">
          <button
            type="button"
            onClick={onHomeClick}
            className="flex cursor-pointer select-none items-center gap-1 px-1 py-1 text-app-text transition-colors duration-200 hover:text-app-text-strong focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-app-focus-neutral"
          >
            <span className="text-xs font-medium text-app-accent sm:text-sm">
              About:
            </span>
            <span className="text-xs font-medium text-app-text-muted sm:text-sm">
              RFLXN
            </span>
          </button>

          <a
            href={githubUrl}
            aria-label="GitHub"
            className="flex items-center gap-1.5 rounded-full border border-app-border bg-app-surface-overlay px-3 py-1.5 text-app-text-muted transition-colors duration-200 hover:border-app-border-strong hover:text-app-text-strong focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-app-focus-neutral"
          >
            <SvgIcon
              iconName="github"
              className="[&>svg]:size-3.5"
            />

            <span className="text-[10px] font-medium uppercase tracking-[0.16em] sm:text-xs">
              GitHub
            </span>
          </a>
        </Container>
      </div>
    </header>
  );
}

export { FixedHeader };
