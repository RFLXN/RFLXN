import type { ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";

import { IconBadge } from "@/components/ui/icon-badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

type FeaturedWorkStack = {
  icon: string,
  label: string,
  rawIcon?: boolean
};

type FeaturedWorkProps = {
  title: string,
  href?: string,
  stacks: FeaturedWorkStack[],
  children: ReactNode
};

const className = "rounded-[1.15rem] border border-app-border bg-[linear-gradient(135deg,var(--app-surface-strong),var(--app-surface)_58%,transparent)] p-6 shadow-[0_14px_40px_rgb(0_0_0_/_0.12)] sm:p-7";
const titleClassName = "text-2xl font-semibold tracking-[-0.04em] text-app-text-strong sm:text-3xl";

function FeaturedWork({ title, href, stacks, children }: FeaturedWorkProps) {
  const titleLinkContent = (
    <>
      <span className="underline-offset-4 group-hover:underline group-focus-visible:underline">
        {title}
      </span>

      <ArrowUpRight className="mt-1 size-4 shrink-0 opacity-45 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100" />
    </>
  );

  return (
    <article className={className}>
      <div className="space-y-4">
        <div className="space-y-2">
          <h3 className={titleClassName}>
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

          <div className="max-w-3xl space-y-2">
            {children}
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
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

export { FeaturedWork };
export type { FeaturedWorkProps, FeaturedWorkStack };
