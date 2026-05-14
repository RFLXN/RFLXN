import { cloneElement, type ReactElement, useEffect, useRef, useState } from "react";

import { Background } from "@/components/background";
import { GoTopButton } from "@/components/go-top-button";
import type { PageProps } from "@/components/page";
import { ScrollHint } from "@/components/scroll-hint";
import { getPageId, homeJumpItems, pageIndicators } from "@/lib/page-navigation";
import pageDefinitions from "@/pages/registry";
import { pageStore } from "@/stores/page";

function Pages() {
  const scrollRootRef = useRef<HTMLElement | null>(null);
  const currentPageId = pageStore(state => state.currentPageId);
  const setCurrentPageId = pageStore(state => state.setCurrentPageId);
  const selectPage = pageStore(state => state.selectPage);
  const lastPageId = pageIndicators[pageIndicators.length - 1]?.id;
  const [ backgroundHeight, setBackgroundHeight ] = useState(0);

  useEffect(() => {
    const scrollRoot = scrollRootRef.current;

    if (!scrollRoot) return;

    const sections = pageIndicators
      .map(item => document.getElementById(item.id))
      .filter((section): section is HTMLElement => section !== null);
    const updateMeasurements = () => setBackgroundHeight(scrollRoot.scrollHeight);
    const resizeObserver = new ResizeObserver(updateMeasurements);

    resizeObserver.observe(scrollRoot);
    sections.forEach(section => resizeObserver.observe(section));
    updateMeasurements();

    return () => resizeObserver.disconnect();
  }, []);

  useEffect(() => {
    const scrollRoot = scrollRootRef.current;

    if (!scrollRoot) return;

    const sections = pageIndicators
      .map(item => document.getElementById(item.id))
      .filter((section): section is HTMLElement => section !== null);
    const observer = new IntersectionObserver(entries => {
      const visibleEntries = entries
        .filter(entry => entry.isIntersecting)
        .sort((entryA, entryB) => entryB.intersectionRatio - entryA.intersectionRatio);
      const nextActiveId = visibleEntries[0]?.target.id;

      if (nextActiveId) setCurrentPageId(nextActiveId);
    }, { root: scrollRoot, threshold: [ 0.45, 0.65, 0.85 ] });

    sections.forEach(section => observer.observe(section));

    return () => observer.disconnect();
  }, [ setCurrentPageId ]);

  return (
    <main
      ref={scrollRootRef}
      className="relative h-screen snap-y snap-mandatory overflow-y-auto overflow-x-hidden overscroll-y-contain font-sans text-app-text"
    >
      <Background totalHeight={backgroundHeight} />

      {currentPageId === lastPageId ? <GoTopButton /> : <ScrollHint />}

      {pageDefinitions.map(page => cloneElement(page.element as ReactElement<PageProps>, {
        key: page.index,
        id: getPageId(page.index),
        title: page.title,
        subtitle: page.subtitle,
        reserveViewportBottom: page.index !== pageDefinitions[0].index,
        jumpItems: page.index === pageDefinitions[0].index ? homeJumpItems : undefined,
        onJumpSelect: page.index === pageDefinitions[0].index ? selectPage : undefined
      }))}
    </main>
  );
}

export default Pages;
