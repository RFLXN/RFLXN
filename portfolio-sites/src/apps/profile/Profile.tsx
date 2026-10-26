import { ArrowUpRight, Github, Mail } from "lucide-react";
import type { AppProps } from "../types";
import { profile } from "../../content/portfolio";
import { Jump } from "../shared/PortfolioUI";
import { ExternalLink } from "../shared/AppUI";
export function Profile({ openApp }: AppProps) {
  return (
    <article className="folio-page profile-page">
      <header className="identity">
        <div>
          <span className="eyebrow">PROFILE / {profile.handle}</span>
          <h1>{profile.name}</h1>
          <p>{profile.role}</p>
        </div>
      </header>
      <p className="profile-statement">
        기능을 만드는 일에서,
        <br />
        <em>서비스로 연결하는 일까지.</em>
      </p>
      <p className="lead-copy">
        Node.js와 TypeScript를 중심으로 백엔드를 개발하고, React 기반 화면과
        배포 환경까지 구성합니다. 직접 쓰는 도구와 개발 환경을 만드는 일에도
        관심이 있습니다.
      </p>
      <div className="contact-row">
        <ExternalLink href={profile.github}>
          <Github size={16} />
          GitHub
        </ExternalLink>
        <a href={`mailto:${profile.email}`}>
          <Mail size={16} />
          {profile.email}
          <ArrowUpRight size={13} />
        </a>
      </div>
      <section className="folio-section">
        <div className="section-heading">
          <span className="eyebrow">EDUCATION</span>
          <h2>학력</h2>
        </div>
        <ol className="timeline">
          <li>
            <span className="timeline-date">2022.02 — 2025.02</span>
            <h3>한국외국어대학교</h3>
            <p>
              컴퓨터·전자시스템공학부 졸업. 귀국 후 편입하여 CS 지식을 보강하고,
              캡스톤 프로젝트에서 프론트엔드 개발을 담당했습니다.
            </p>
            <button
              className="text-button"
              onClick={() => openApp({ appId: "projects", item: "innosheet" })}
            >
              이노시트 보기 <ArrowUpRight size={14} />
            </button>
          </li>
          <li>
            <span className="timeline-date">2019.03 — 2021.03</span>
            <h3>Tokyo Technical College</h3>
            <p>
              정보처리과 졸업. 2년간 일본에서 Java·DB·객체지향을 중심으로
              학습하고, 졸업작품 팀장으로 설계와 개발을 이끌었습니다.
            </p>
            <button
              className="text-button"
              onClick={() => openApp({ appId: "projects", item: "jisakupc" })}
            >
              JisakuPC 보기 <ArrowUpRight size={14} />
            </button>
          </li>
        </ol>
      </section>
      <div className="two-column">
        <Jump
          caption="기술을 사용한 구체적인 사례"
          onClick={() => openApp({ appId: "skills" })}
        >
          Skills
        </Jump>
        <Jump
          caption="교육과 팀 리딩, 오픈소스 기여"
          onClick={() => openApp({ appId: "experiences" })}
        >
          Experiences
        </Jump>
      </div>
    </article>
  );
}
