import { SectionTitle } from './SectionTitle';
import type { CardProps } from './types';

export function ProjectsCard({ children, icon, title }: CardProps) {
  return (
    <section className="card projects-card">
      <SectionTitle icon={icon} title={title} />
      {children}
    </section>
  );
}
