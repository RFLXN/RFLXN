import { projects } from "../../content/portfolio";
import type { ProjectTab } from "../../content/portfolio";
import type { AppProps } from "../types";
import { useContentStore } from "../../store/contentStore";
import { AppLayout, Heading, NavItem, ExternalLink } from "../shared/AppUI";
import { Flow, Jump, SkillLink } from "../shared/PortfolioUI";
const tabs: [ProjectTab, string][] = [
  ["main", "소개"],
  ["stack", "스택"],
  ["problems", "주요 문제"],
];
export function Projects({ openApp }: AppProps) {
  const {
    project: id,
    projectTab: tab,
    problem: problemId,
    navigate,
  } = useContentStore();
  const project = projects.find((p) => p.id === id)!;
  const problem =
    project.problems.find((p) => p.id === problemId) ?? project.problems[0];
  return (
    <AppLayout
      label="PROJECTS / 05"
      pageKey={`${id}/${tab}/${problemId}`}
      sidebar={
        <>
          {projects.map((p, index) => (
            <NavItem
              key={p.id}
              title={p.name}
              caption={`${String(index + 1).padStart(2, "0")} / ${p.category}`}
              active={p.id === id}
              onClick={() => navigate({ appId: "projects", item: p.id })}
            />
          ))}
        </>
      }
    >
      <Heading eyebrow={project.category} title={project.name}>
        {project.caption}
      </Heading>
      <nav className="content-tabs" aria-label={`${project.name} 상세`}>
        {tabs.map(([value, label]) => (
          <button
            key={value}
            aria-pressed={tab === value}
            className={tab === value ? "selected" : ""}
            onClick={() => navigate({ appId: "projects", tab: value })}
          >
            {label}
            {value === "problems" && (
              <span className="tab-count">{project.problems.length}</span>
            )}
          </button>
        ))}
      </nav>
      {tab === "main" && (
        <>
          <p className="project-summary">{project.summary}</p>
          <p>{project.context}</p>
          <section className="role-card">
            <span className="eyebrow">MY CONTRIBUTION</span>
            <h2>역할</h2>
            <p>{project.role}</p>
          </section>
          <section className="folio-section">
            <h2>주요 기능</h2>
            <ul className="feature-list">
              {project.features.map((f, i) => (
                <li key={f}>
                  <span>0{i + 1}</span>
                  {f}
                </li>
              ))}
            </ul>
          </section>
          {id === "jisakupc" && (
            <Jump
              caption="일본 유학 중 팀장으로 프로젝트를 진행한 경험"
              onClick={() =>
                openApp({ appId: "experiences", item: "leadership" })
              }
            >
              팀 리딩 이야기
            </Jump>
          )}
        </>
      )}
      {tab === "stack" && (
        <>
          <p className="section-intro">
            이 프로젝트에서 각 기술을 사용한 목적입니다. 기술을 선택하면
            Skills에서 다른 사용 사례도 볼 수 있습니다.
          </p>
          <div className="stack-list">
            {project.stack.map((s) => (
              <div key={s.skill}>
                <SkillLink id={s.skill} openApp={openApp} />
                <p>{s.usage}</p>
              </div>
            ))}
          </div>
          <section className="folio-section">
            <h2>함께 사용한 도구</h2>
            <div className="plain-tags">
              {project.tools.map((tool) => (
                <span key={tool}>{tool}</span>
              ))}
            </div>
          </section>
        </>
      )}
      {tab === "problems" && (
        <>
          <nav className="problem-picker" aria-label="주요 문제 선택">
            {project.problems.map((p, i) => (
              <button
                key={p.id}
                aria-pressed={p.id === problem.id}
                onClick={() => navigate({ appId: "projects", problem: p.id })}
              >
                <span>0{i + 1}</span>
                {p.title}
              </button>
            ))}
          </nav>
          <section className="problem-detail" aria-label={problem.title}>
            <span className="eyebrow">PROBLEM / APPROACH / RESULT</span>
            <h2 className="problem-title">{problem.title}</h2>
            <Flow steps={problem.flow} />
            <dl className="problem-story">
              {[
                ["문제", problem.problem],
                ["해결 방식", problem.solution],
                ["결과와 배운 점", problem.result],
              ].map(([label, text]) => (
                <div key={label}>
                  <dt>{label}</dt>
                  <dd>{text}</dd>
                </div>
              ))}
            </dl>
            <div className="skill-links" aria-label="관련 기술">
              {problem.skills.map((id) => (
                <SkillLink key={id} id={id} openApp={openApp} />
              ))}
            </div>
            <ExternalLink href={problem.source}>
              {problem.sourceLabel}
            </ExternalLink>
          </section>
        </>
      )}
      <footer className="folio-foot">
        <ExternalLink href={project.repo}>프로젝트 저장소</ExternalLink>
        <span>구현과 기여 기록을 함께 확인할 수 있습니다.</span>
      </footer>
    </AppLayout>
  );
}
