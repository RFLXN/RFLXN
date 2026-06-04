import { SectionTitle } from './SectionTitle';
import type { CardProps } from './types';

export function StackCard({ children, icon, title }: CardProps) {
  return (
    <section className="card stack-card">
      <SectionTitle icon={icon} title={title} />
      <div className="stack-compact">{children}</div>
    </section>
  );
}
