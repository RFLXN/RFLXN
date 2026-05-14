import { Page, PageContents, type PageData } from "@/components/page";
import { ProfileList } from "@/components/ui/profile-list";
import { SkillSection } from "@/components/ui/skill-section";
import { SvgIcon } from "@/components/ui/svg-icon";
import { User, BadgeCheck, Mail, MonitorCog, Heart } from "lucide-react";

const profileItems = [
  {
    icon: (
      <User
        aria-hidden="true"
        className="size-4 stroke-[1.9]"
      />
    ),
    label: "Name",
    text: "최준혁"
  },
  {
    icon: <BadgeCheck aria-hidden="true" className="size-4 stroke-[1.9]" />,
    label: "Role",
    text: "Junior Full-Stack Web Developer"
  },
  {
    icon: (
      <Mail
        aria-hidden="true"
        className="size-4 stroke-[1.9]"
      />
    ),
    label: "Email",
    text: "solid2113@naver.com",
    href: "mailto:solid2113@naver.com"
  },
  {
    icon: <SvgIcon iconName="github" />,
    label: "GitHub",
    text: "RFLXN",
    href: "https://github.com/RFLXN"
  },
  {
    icon: <MonitorCog aria-hidden="true" className="size-4 stroke-[1.9]" />,
    label: "Environment",
    text: [
      "Asahi Linux / NixOS",
      "VS Code / JetBrains IDE"
    ]
  },
  {
    icon: <Heart aria-hidden="true" className="size-4 stroke-[1.9]" />,
    label: "Interest",
    text: [
      "Linux Customization",
      "(Desktop Environment, Tooling)"
    ]
  }
];

const workPage: PageData = {
  title: "Profile / Skills",
  label: "Profile / Skills",
  index: 2,
  element: (
    <Page>
      <PageContents>
        <div className="grid gap-5 md:grid-cols-[max-content_1px_minmax(0,1fr)] md:gap-6">
          <div className="space-y-3 md:min-w-max">
            <p className="text-xs font-medium uppercase tracking-[0.24em] text-app-text-subtle">
              Profile
            </p>

            <ProfileList items={profileItems} />
          </div>

          <div className="hidden md:block bg-app-border-strong" />

          <div className="space-y-3">
            <p className="text-xs font-medium uppercase tracking-[0.24em] text-app-text-subtle">
              Skills
            </p>

            <div className="space-y-4">
              <SkillSection
                label="Primary"
                skills={[
                  { icon: "javascript", label: "JavaScript" },
                  { icon: "typescript", label: "TypeScript" },
                  { icon: "nodejs", label: "Node.js" },
                  { icon: "express", label: "Express" },
                  { icon: "react", label: "React" },
                  { icon: "nextjs", label: "Next.js" },
                  { icon: "docker", label: "Docker" },
                  { icon: "nixos", label: "NixOS" }
                ]}
              />
              <SkillSection
                label="Familiar"
                skills={[
                  { icon: "nestjs", label: "NestJS" },
                  { icon: "koa", label: "Koa" },
                  { icon: "prisma", label: "Prisma" },
                  { icon: "typeorm", label: "TypeORM" },
                  { icon: "knexjs", label: "Knex.js" },
                  { icon: "openjdk", label: "Java" },
                  { icon: "python", label: "Python" },
                  { icon: "mysql", label: "MySQL" },
                  { icon: "postgres", label: "PostgreSQL" },
                  { icon: "redis", label: "Redis" },
                  { icon: "ubuntu", label: "Ubuntu" },
                  { icon: "ec2", label: "AWS" }
                ]}
              />
              <SkillSection
                label="In Progress"
                skills={[
                  { icon: "spring", label: "Spring / Spring Boot" },
                  { icon: "kotlin", label: "Kotlin" }
                ]}
              />
              <SkillSection
                label="Learning"
                skills={[
                  { icon: "rust", label: "Rust" }
                ]}
              />
            </div>
          </div>
        </div>
      </PageContents>
    </Page>
  )
};

export default workPage;
