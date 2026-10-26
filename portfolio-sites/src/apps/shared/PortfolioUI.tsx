import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";
import { findSkill } from "../../content/portfolio";
import type { AppTarget, SkillId } from "../../content/portfolio";
import { TechnologyTag } from "./TechnologyTag";
export function SkillLink({
  id,
  openApp,
}: {
  id: SkillId;
  openApp: (target: AppTarget) => void;
}) {
  return (
    <button
      className="skill-link"
      onClick={() => openApp({ appId: "skills", item: id })}
      title={`${findSkill(id).name} 사용 경험 보기`}
    >
      <TechnologyTag name={findSkill(id).name} />
      <ArrowRight size={12} aria-hidden="true" />
    </button>
  );
}
export function Jump({
  children,
  onClick,
  caption,
}: {
  children: ReactNode;
  onClick: () => void;
  caption?: string;
}) {
  return (
    <button className="jump-card" onClick={onClick}>
      <span>
        <strong>{children}</strong>
        {caption && <small>{caption}</small>}
      </span>
      <ArrowRight size={18} aria-hidden="true" />
    </button>
  );
}
export function Flow({ steps }: { steps: string[] }) {
  return (
    <ol className="flow" aria-label="구현 흐름">
      {steps.map((step, index) => (
        <li key={step}>
          <span>{String(index + 1).padStart(2, "0")}</span>
          {step}
        </li>
      ))}
    </ol>
  );
}
