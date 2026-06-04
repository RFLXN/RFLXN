import { SectionTitle } from './SectionTitle';
import type { CardProps } from './types';

export function EducationCard({ children, icon, title }: CardProps) {
  return (
    <section className="card education-card">
      <SectionTitle icon={icon} title={title} />
      {children}
    </section>
  );
}
