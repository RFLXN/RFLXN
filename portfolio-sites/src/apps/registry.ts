import { Intro } from "./intro/Intro";
import { Profile } from "./profile/Profile";
import { Skills } from "./skills/Skills";
import { Projects } from "./projects/Projects";
import { Experiences } from "./experiences/Experiences";
import { Preference } from "./preference/Preference";
import type { AppDefinition, AppIconSource } from "./types";
import "./content.css";
const icon = (name: string): AppIconSource => ({
  16: `/icons/papirus/${name}-16.svg`,
  22: `/icons/papirus/${name}-22.svg`,
  48: `/icons/papirus/${name}-48.svg`,
  64: `/icons/papirus/${name}-64.svg`,
});
export const apps: AppDefinition[] = [
  {
    id: "intro",
    title: "Intro",
    description: "환영합니다",
    icon: icon("welcome"),
    component: Intro,
    initialSize: { width: 850, height: 710 },
  },
  {
    id: "profile",
    title: "Profile",
    description: "인적사항",
    icon: icon("profile"),
    component: Profile,
    initialSize: { width: 820, height: 760 },
  },
  {
    id: "skills",
    title: "Skills",
    description: "기술과 실제 사용 경험",
    icon: icon("devlog"),
    component: Skills,
    initialSize: { width: 980, height: 760 },
  },
  {
    id: "projects",
    title: "Projects",
    description: "참여한 프로젝트",
    icon: icon("projects"),
    component: Projects,
    initialSize: { width: 1050, height: 780 },
  },
  {
    id: "experiences",
    title: "Experiences",
    description: "프로젝트 외 경험들",
    icon: icon("collaborates"),
    component: Experiences,
    initialSize: { width: 980, height: 760 },
  },
  {
    id: "preference",
    title: "Preference",
    description: "개발 환경",
    icon: icon("system"),
    component: Preference,
    initialSize: { width: 920, height: 760 },
  },
];
