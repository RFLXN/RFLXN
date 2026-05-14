import { Page, PageContents, type PageData } from "@/components/page";
import { Works } from "@/components/works";

const otherWorksPage: PageData = {
  title: "Works",
  label: "Other Works",
  index: 4,
  element: (
    <Page snapEnd>
      <PageContents>
        <div className="grid gap-4 md:grid-cols-2">
          <Works
            title="nix-flake"
            href="https://github.com/RFLXN/nix-flake"
            description="여러 대의 NixOS 시스템을 관리하는 개인 인프라 설정 저장소입니다. 각 설정을 공통 모듈을 통해 관리, 환경을 통일하여 일관된 개발 환경을 구축했습니다."
            stacks={[
              { icon: "linux", label: "Linux" },
              { icon: "nixos", label: "NixOS" }
            ]}
          />
          <Works
            title="Discord-D2-LFG-Bot"
            href="https://github.com/RFLXN/Discord-D2-LFG-Bot"
            description="디스코드에서 파티 모집을 자동화하기 위한 봇입니다. 약 150명이 참가한 서버에서 사용되었습니다. Discord와 비슷한 API를 가진 Slack 앱 개발에 도움이 될 거라고 생각합니다."
            stacks={[
              { icon: "nodejs", label: "Node.js" },
              { icon: "typescript", label: "TypeScript" },
              { icon: "typeorm", label: "TypeORM" }
            ]}
          />
          <Works
            title="Simple-MJS-Client"
            href="https://github.com/RFLXN/Simple-MJS-Client"
            description="Electron으로 웹 게임을 Wrap한 클라이언트입니다. Chrome의 DevTools Protocol을 이용해, WebSocket 트래픽을 관찰하고, Protobuf 기반의 게임 데이터를 파싱/분석했습니다."
            stacks={[
              { icon: "typescript", label: "TypeScript" },
              { icon: "electron", label: "Electron" }
            ]}
          />
          <Works
            title="6th-umc-node-ts"
            description="대학 연합 동아리 University MakeUs Challenge에서 한국외대 Node.js 파트장을 맡았습니다. 기존의 JS/Node.js 교재에 더해, 직접 작성한 TS 핸드북을 통해 약 12명에게 10번에 걸쳐 강의를 진행했습니다."
            href="https://github.com/RFLXN/6th-umc-node-ts"
            stacks={[
              { icon: "typescript", label: "TypeScript" },
              { icon: "nodejs", label: "Node.js" },
              { icon: "jest", label: "Jest" }
            ]}
          />
          <Works
            title="JisakuPC"
            href="https://github.com/RFLXN/JisakuPC"
            description="도쿄 테크니컬 칼리지 졸업작품 입니다. Java Servlet/JSP 기반의 전통적인 웹앱 입니다. 일본인 친구들 사이에서 팀장으로써 설계와 개발을 총괄했습니다."
            stacks={[
              { icon: "openjdk", label: "Java" }
            ]}
          />
          <Works
            title="portfolio-sites"
            href="https://github.com/RFLXN/RFLXN/tree/main/portfolio-sites"
            description="현재 보고 계신 사이트의 코드입니다. Vite + React 기반으로 작성했으며, RFLXN 프로필 저장소의 하위 프로젝트로 GitHub Pages에 배포합니다."
            stacks={[
              { icon: "react", label: "React" },
              { icon: "vite", label: "Vite" },
              { icon: "typescript", label: "TypeScript" }
            ]}
          />
        </div>
      </PageContents>
    </Page>
  )
};

export default otherWorksPage;
