import type { AppProps } from "../types";
import type { ExperienceId } from "../../content/portfolio";
import { useContentStore } from "../../store/contentStore";
import { AppLayout, Heading, NavItem, ExternalLink } from "../shared/AppUI";
import { Flow, Jump, SkillLink } from "../shared/PortfolioUI";
const items: { id: ExperienceId; name: string; caption: string }[] = [
  { id: "teaching", name: "지식을 나누는 일", caption: "UMC / 교육·스터디" },
  { id: "leadership", name: "함께 만드는 일", caption: "유학 / 팀 리딩" },
  { id: "opensource", name: "쓰다가 고치는 일", caption: "오픈소스 / NixOS" },
];
export function Experiences({ openApp }: AppProps) {
  const selected = useContentStore((s) => s.experience);
  return (
    <AppLayout
      label="EXPERIENCES"
      pageKey={selected}
      sidebar={
        <>
          {items.map((item) => (
            <NavItem
              key={item.id}
              title={item.name}
              caption={item.caption}
              active={selected === item.id}
              onClick={() =>
                useContentStore
                  .getState()
                  .navigate({ appId: "experiences", item: item.id })
              }
            />
          ))}
        </>
      }
    >
      {selected === "teaching" && (
        <>
          <Heading
            eyebrow="TEACHING / UMC 6TH"
            title="배운 것을, 함께 쓸 수 있는 지식으로"
          >
            한국외대 Node.js 파트장으로 TypeScript 교재를 만들고 강의와 스터디를
            이끌었습니다.
          </Heading>
          <section className="role-card">
            <h2>파트장으로 합류하다</h2>
            <p>
              대학생 연합 개발 동아리 UMC에서 한국외대 Node.js 파트장으로 제안을
              받아 활동했습니다. 기존 JavaScript·Node.js 학습에 TypeScript를
              연결할 수 있도록 자료와 예제를 직접 구성했습니다.
            </p>
          </section>
          <section className="folio-section">
            <h2>직접 구성한 학습 과정</h2>
            <Flow
              steps={[
                "TypeScript와 개발 도구",
                "타입과 프로젝트 구성",
                "API 응답·에러 처리",
                "DB·Swagger·페이징",
              ]}
            />
            <p>
              문법을 익히는 단계에서 출발해 API 구현까지 이어지는 교재입니다.
              코드의 형태뿐 아니라 응답 구조와 오류를 어떻게 다룰지도 함께
              설명했습니다.
            </p>
            <ExternalLink href="https://github.com/RFLXN/6th-umc-node-ts">
              교재와 예제 코드
            </ExternalLink>
          </section>
          <div className="skill-links">
            <SkillLink id="typescript" openApp={openApp} />
            <SkillLink id="node" openApp={openApp} />
          </div>
          <Jump
            caption="실제 프로젝트에서 API 응답 계약을 조율한 사례"
            onClick={() =>
              openApp({
                appId: "projects",
                item: "innosheet",
                problem: "api-contract",
              })
            }
          >
            교육 주제와 실전 경험 연결하기
          </Jump>
        </>
      )}
      {selected === "leadership" && (
        <>
          <Heading
            eyebrow="COLLABORATION / JAPAN → KOREA"
            title="다른 환경에서도, 함께 개발하기"
          >
            일본 유학과 귀국 후 편입을 거치며 팀 프로젝트와 교육 활동을
            이어왔습니다.
          </Heading>
          <ol className="timeline">
            <li>
              <span className="timeline-date">일본 유학</span>
              <h3>Java·DB·객체지향을 실제 프로젝트로</h3>
              <p>
                2년제 정보처리과에서 학습한 내용을 졸업작품 JisakuPC에
                적용했습니다. 유학생으로 일본인 팀원들과 협업하며 팀장으로
                설계와 개발을 총괄했습니다.
              </p>
            </li>
            <li>
              <span className="timeline-date">귀국 후 편입</span>
              <h3>구현 경험에 CS 기반을 더하다</h3>
              <p>
                한국외대에 편입해 컴퓨터·전자시스템공학을 공부했습니다. 이전의
                프로젝트 경험을 바탕으로 팀 개발에 참여하고, 캡스톤
                프로젝트에서는 프론트엔드를 담당했습니다.
              </p>
            </li>
            <li>
              <span className="timeline-date">동아리 활동</span>
              <h3>함께 배우는 과정을 이끌다</h3>
              <p>
                UMC Node.js 파트장으로 교재를 제작하고 강의와 스터디를
                주도했습니다.
              </p>
            </li>
          </ol>
          <div className="card-list">
            <Jump
              caption="Java 웹 서비스의 설계와 구현"
              onClick={() => openApp({ appId: "projects", item: "jisakupc" })}
            >
              JisakuPC
            </Jump>
            <Jump
              caption="캡스톤 프로젝트의 프론트엔드 개발"
              onClick={() => openApp({ appId: "projects", item: "innosheet" })}
            >
              이노시트
            </Jump>
          </div>
        </>
      )}
      {selected === "opensource" && (
        <>
          <Heading eyebrow="LINUX / NIXOS" title="직접 고치며 쓰는 재미">
            Windows나 macOS를 사용할 때와 달리, NixOS에서는 필요한 기능을 직접
            구성하거나 사용 중 생긴 문제를 고쳐야 할 때가 있습니다. 저는 그
            과정을 흥미롭게 느끼고, 실제로 원인을 찾아 수정하며 사용하고
            있습니다.
          </Heading>
          <section className="folio-section">
            <h2>사용 중 만난 오류를 직접 수정한 경험</h2>
            <p>
              설치 스크립트가 필요한 파일을 찾지 못하는 문제를 추적하고, 수정
              사항을 원본 프로젝트에 기여했습니다.
            </p>
          </section>
          <span className="status-badge">PR #35 · 병합</span>
          <dl className="problem-story">
            <div>
              <dt>겪은 문제</dt>
              <dd>
                nix run으로 실행할 때 설치 스크립트가 참조하는
                patch-linux-window-ui.js를 찾지 못했습니다.
              </dd>
            </div>
            <div>
              <dt>찾은 원인</dt>
              <dd>
                임시 디렉터리에 install.sh와 DMG만 복사하고 있어, 상대 경로로
                참조하는 scripts/와 assets/가 빠져 있었습니다.
              </dd>
            </div>
            <div>
              <dt>수정과 기여</dt>
              <dd>
                정리된 소스 트리 전체를 복사하도록 변경하고 DMG 고정 해시를
                갱신했습니다. 변경 사항은 원본 프로젝트에 병합됐습니다.
              </dd>
            </div>
          </dl>
          <Flow
            steps={[
              "실행 오류",
              "누락된 상대 경로 확인",
              "소스 트리 복사",
              "PR 병합",
            ]}
          />
          <ExternalLink href="https://github.com/ilysenko/codex-desktop-linux/pull/35">
            원본 프로젝트의 PR 확인
          </ExternalLink>
          <div className="skill-links">
            <SkillLink id="linux" openApp={openApp} />
          </div>
          <Jump
            caption="문제를 만난 일상적인 개발 환경"
            onClick={() => openApp({ appId: "preference" })}
          >
            개발 환경 살펴보기
          </Jump>
        </>
      )}
    </AppLayout>
  );
}
