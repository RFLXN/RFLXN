import { create } from "zustand";
import { projects } from "../content/portfolio";
import type {
  AppTarget,
  ProjectId,
  ProjectTab,
  SkillId,
  ExperienceId,
} from "../content/portfolio";
interface ContentState {
  project: ProjectId;
  projectTab: ProjectTab;
  problem: string;
  skill: SkillId;
  experience: ExperienceId;
  navigate: (target: AppTarget) => void;
}
export const useContentStore = create<ContentState>((set) => ({
  project: "bilbil",
  projectTab: "main",
  problem: "chat",
  skill: "node",
  experience: "teaching",
  navigate: (target) =>
    set((state) => {
      switch (target.appId) {
        case "projects": {
          const project = projects.find(
            (p) => p.id === (target.item ?? state.project),
          )!;
          const requested =
            target.problem ??
            (target.item && target.item !== state.project
              ? project.problems[0].id
              : state.problem);
          const problem = project.problems.some((p) => p.id === requested)
            ? requested
            : project.problems[0].id;
          return {
            project: project.id,
            problem,
            projectTab: target.problem
              ? "problems"
              : (target.tab ?? (target.item ? "main" : state.projectTab)),
          };
        }
        case "skills":
          return { skill: target.item ?? state.skill };
        case "experiences":
          return { experience: target.item ?? state.experience };
        default:
          return state;
      }
    }),
}));
