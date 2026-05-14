import { FixedHeader } from "@/components/fixed-header";
import { PageIndicator } from "@/components/page-indicator";
import { homePageId, pageIndicators } from "@/lib/page-navigation";
import Pages from "@/pages";
import { pageStore } from "@/stores/page";

function Layout() {
  const currentPageId = pageStore(state => state.currentPageId);
  const selectPage = pageStore(state => state.selectPage);

  return (
    <>
      <FixedHeader onHomeClick={() => selectPage(homePageId)} />

      {currentPageId === homePageId ? null : (
        <PageIndicator
          items={pageIndicators}
          activeId={currentPageId}
          onSelect={selectPage}
        />
      )}

      <Pages />
    </>
  );
}

export default Layout;
