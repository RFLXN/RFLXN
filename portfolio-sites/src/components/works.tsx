import { ArrowUpRight } from "lucide-react";

import { IconBadge } from "@/components/ui/icon-badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

type WorkStack = {
  icon: string,
  label: string,
  rawIcon?: boolean
};

type WorksProps = {
  title: string,
  href?: string,
  description: string,
  stacks: WorkStack[]
};

const className = "h-full rounded-[1rem] border border-app-border bg-[linear-gradient(135deg,var(--app-surface-strong),var(--app-surface)_72%,transparent)] p-5 shadow-[0_10px_30px_rgb(0_0_0_/_0.12)]";

function Works({ title, href, description, stacks }: WorksProps) {
  const normalizedDescription = description
    .split("\n")
    .map(line => line.trim())
    .join("\n")
    .trim();
  const titleLinkContent = (
    <>
      <span className="underline-offset-4 group-hover:underline group-focus-visible:underline">
        {title}
      </span>

      <ArrowUpRight className="mt-0.5 size-3.5 shrink-0 opacity-45 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100" />
    </>
  );

  return (
    <article className={className}>
      <div className="flex h-full flex-col gap-4">
        <div className="space-y-2">
          <h3 className="text-lg font-semibold tracking-[-0.03em] text-app-text-strong sm:text-xl">
            {href ? (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger
                    render={(
                      <a
                        href={href}
                        className="group inline-flex items-start gap-2 transition-colors hover:text-app-accent focus-visible:text-app-accent"
                      />
                    )}
                  >
                    {titleLinkContent}
                  </TooltipTrigger>

                  <TooltipContent side="right">
                    View more in GitHub
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ) : title}
          </h3>

          <p className="whitespace-pre-line text-sm leading-6 text-app-text-muted">
            {normalizedDescription}
          </p>
        </div>

        <div className="mt-auto flex flex-wrap gap-2">
          {stacks.map(stack => (
            <IconBadge
              key={`${title}-${stack.icon}-${stack.label}`}
              iconName={stack.icon}
              rawIcon={stack.rawIcon}
              withColor
              label={stack.label}
            />
          ))}
        </div>
      </div>
    </article>
  );
}

export { Works };
export type { WorksProps, WorkStack };
