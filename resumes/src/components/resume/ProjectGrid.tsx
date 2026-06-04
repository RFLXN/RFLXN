import type { ChildrenProps } from './types';

export function ProjectGrid({ children }: ChildrenProps) {
  return <div className="project-mini-bars">{children}</div>;
}
