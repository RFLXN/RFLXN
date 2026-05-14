import { IconBadge } from "@/components/ui/icon-badge";

type SkillSectionItem = {
  icon: string,
  label: string,
  rawIcon?: boolean
};

type SkillSectionProps = {
  label: string,
  skills: SkillSectionItem[]
};

function SkillSection({ label, skills }: SkillSectionProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-3">
        <p className="text-[11px] font-mono uppercase tracking-[0.16em] text-app-text-faint">
          {label}
        </p>

        <div className="h-px flex-1 bg-app-border" />
      </div>

      <div className="flex flex-wrap gap-2">
        {skills.map(skill => (
          <IconBadge
            key={`${label}-${skill.icon}-${skill.label}`}
            iconName={skill.icon}
            rawIcon={skill.rawIcon}
            withColor
            label={skill.label}
          />
        ))}
      </div>
    </div>
  );
}

export { SkillSection };
export type { SkillSectionItem, SkillSectionProps };
