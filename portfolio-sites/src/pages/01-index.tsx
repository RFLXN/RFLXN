import { Page, PageContents, type PageData, type PageFooterRenderer } from "@/components/page";
import { PageJumpNav } from "@/components/page-jump-nav";
import { ScrollHint } from "@/components/scroll-hint";
import { HashBadge } from "@/components/ui/hash-badge";

const renderIndexFooter: PageFooterRenderer = ({ jumpItems, onJumpSelect }) => (
  <div className="space-y-4 pt-8 sm:space-y-5 sm:pt-10">
    <div className="space-y-3">
      <ScrollHint variant="inline" />

      <p className="text-center text-xs font-medium uppercase tracking-[0.18em] text-app-text-muted sm:text-sm">
        or
      </p>
    </div>

    {jumpItems?.length && onJumpSelect ? (
      <PageJumpNav
        items={jumpItems}
        onSelect={onJumpSelect}
      />
    ) : null}
  </div>
);

const indexPage: PageData = {
  title: "RFLXN",
  label: "About",
  subtitle: "Junior Full-Stack Web Developer",
  index: 1,
  element: (
    <Page
      footer={renderIndexFooter}
    >
      <PageContents>
        <div className="space-y-4">
          <p className="text-lg font-semibold leading-8 tracking-[-0.03em] text-app-text-strong sm:text-2xl sm:leading-9">
            Node.js/TS 중심으로 개발부터 배포까지 연결 가능한 풀스택 웹 개발자
          </p>

          <p className="text-base leading-7 text-app-text-muted sm:text-lg">
            ・JS, TS 생태계를 중심으로 프론트엔드와 백엔드를 모두 다룹니다.
            <br />
            ・필요에 따라 Java, Kotlin, Python등의 다른 언어와 프레임워크로 확장 가능합니다.
            <br />
            ・Docker, Linux 기반 개발/배포 워크플로우에 익숙합니다.
            <br />
            ・단순 작업과 반복 과정에 AI를 활용하여 효율을 높힙니다.
          </p>

          <div className="flex flex-wrap gap-2">
            <HashBadge label="FullStack" />
            <HashBadge label="Node.js/TypeScript" />
            <HashBadge label="Java・Kotlin・Python" />
            <HashBadge label="Docker/Linux Workflows" />
            <HashBadge label="AWS" />
          </div>
        </div>
      </PageContents>
    </Page>
  )
};

export default indexPage;
