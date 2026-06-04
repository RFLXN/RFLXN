import { SectionTitle } from './SectionTitle';
import type { CardProps } from './types';

export function ProfileCard({ children, icon, title }: CardProps) {
  return (
    <section className="card soft">
      <SectionTitle icon={icon} title={title} />
      <p className="summary">{children}</p>
    </section>
  );
}
