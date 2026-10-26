import { skills, findSkill, skillProjects } from "../../content/portfolio";
import type { AppProps } from "../types";
import { useContentStore } from "../../store/contentStore";
import { AppLayout, Heading, NavItem } from "../shared/AppUI";
import { Jump } from "../shared/PortfolioUI";
import { TechnologyTag } from "../shared/TechnologyTag";
const groups = [...new Set(skills.map((s) => s.group))];
export function Skills({ openApp }: AppProps) {
  const selected = useContentStore((s) => s.skill);
  const skill = findSkill(selected);
  const related = skillProjects(selected);
  return (
    <AppLayout
      label="SKILLS"
      pageKey={selected}
      sidebar={
        <>
          {groups.map((group) => (
            <div className="skill-group" key={group}>
              <span className="sidebar-group">{group}</span>
              {skills
                .filter((s) => s.group === group)
                .map((s) => (
                  <NavItem
                    key={s.id}
                    title={s.name}
                    caption=""
                    active={s.id === selected}
                    onClick={() =>
                      useContentStore
                        .getState()
                        .navigate({ appId: "skills", item: s.id })
                    }
                  />
                ))}
            </div>
          ))}
        </>
      }
    >
      <Heading eyebrow={skill.group} title={skill.name}>
        {skill.description}
      </Heading>
      <div className="skill-emblem">
        <TechnologyTag name={skill.name} />
        <span>구현한 경험을 기준으로 소개합니다.</span>
      </div>
      <section className="folio-section">
        <div className="section-heading">
          <span className="eyebrow">IN PRACTICE</span>
          <h2>어디에 사용했나요?</h2>
        </div>
        <div className="card-list">
          {related.map((project) => {
            const problems = project.problems.filter((p) =>
              p.skills.includes(selected),
            );
            return (
              <section className="skill-evidence" key={project.id}>
                <span className="eyebrow">{project.category}</span>
                <h3>{project.name}</h3>
                <p>{project.stack.find((s) => s.skill === selected)!.usage}</p>
                <div className="card-list">
                  {problems.map((problem) => (
                    <Jump
                      key={problem.id}
                      caption="Projects · 주요 문제로 이동"
                      onClick={() =>
                        openApp({
                          appId: "projects",
                          item: project.id,
                          problem: problem.id,
                        })
                      }
                    >
                      {problem.title}
                    </Jump>
                  ))}
                  <button
                    className="text-button"
                    onClick={() =>
                      openApp({
                        appId: "projects",
                        item: project.id,
                        tab: "stack",
                      })
                    }
                  >
                    이 프로젝트의 전체 스택 보기 →
                  </button>
                </div>
              </section>
            );
          })}
        </div>
        {selected === "linux" && (
          <div className="card-list">
            <Jump
              caption="NixOS 데스크톱·노트북·홈서버와 공통 설정"
              onClick={() => openApp({ appId: "preference" })}
            >
              매일 사용하는 개발 환경
            </Jump>
            <Jump
              caption="설치에 필요한 파일 누락을 수정한 병합 PR"
              onClick={() =>
                openApp({ appId: "experiences", item: "opensource" })
              }
            >
              NixOS 설치 오류 해결
            </Jump>
          </div>
        )}
      </section>
      {selected === "typescript" && (
        <section className="folio-section">
          <h2>함께 나눈 경험</h2>
          <Jump
            caption="직접 만든 TypeScript 교재로 강의와 스터디를 진행했습니다."
            onClick={() => openApp({ appId: "experiences", item: "teaching" })}
          >
            UMC Node.js 파트장
          </Jump>
        </section>
      )}
    </AppLayout>
  );
}
