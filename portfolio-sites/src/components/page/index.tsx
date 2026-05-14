import type { JSX, PropsWithChildren, ReactNode } from "react";

import { Container } from "@/components/container";
import { PageContents } from "@/components/page/contents";
import { PageFooter } from "@/components/page/footer";
import { PageHeader } from "@/components/page/header";

type PageJumpNavItem = {
  id: string,
  label: string
};

type PageFooterContext = {
  jumpItems?: PageJumpNavItem[],
  onJumpSelect?(id: string): void
};

interface PageFooterRenderer { (context: PageFooterContext): ReactNode }

type PageProps = PropsWithChildren<{
  id?: string,
  title?: string,
  subtitle?: string,
  snapEnd?: boolean,
  reserveViewportBottom?: boolean,
  footer?: ReactNode | PageFooterRenderer,
  jumpItems?: PageJumpNavItem[],
  onJumpSelect?(id: string): void
}>;

type PageData = {
  title: string,
  label?: string,
  subtitle?: string,
  index: number,
  element: JSX.Element
};

const sectionClassName = "relative isolate flex min-h-screen snap-start snap-always items-center py-16 sm:py-20";
const shellClassName = "mx-auto w-full max-w-4xl space-y-6";
const bottomReserveClassName = "pb-28 sm:pb-32";

function Page({
  id,
  title = "",
  subtitle,
  snapEnd = false,
  reserveViewportBottom = false,
  footer,
  jumpItems,
  onJumpSelect,
  children
}: PageProps) {
  const resolvedFooter = typeof footer === "function"
    ? footer({ jumpItems, onJumpSelect })
    : footer;
  const resolvedShellClassName = reserveViewportBottom
    ? `${shellClassName} ${bottomReserveClassName}`
    : shellClassName;

  return (
    <section
      id={id}
      className={sectionClassName}
    >
      <Container className="relative">
        <div className={resolvedShellClassName}>
          <PageHeader
            title={title}
            subtitle={subtitle}
          />

          {children}

          <PageFooter>
            {resolvedFooter}
          </PageFooter>

          {snapEnd ? <div className="h-8 snap-end sm:h-10" /> : null}
        </div>
      </Container>
    </section>
  );
}

export { Page };
export { PageContents, PageFooter, PageHeader };
export type { PageData, PageFooterContext, PageFooterRenderer, PageJumpNavItem, PageProps };
