import { SectionTitle } from './SectionTitle';
import type { CardProps } from './types';

export function ListCard({ children, icon, title, variant }: CardProps) {
  return (
    <section className={['card', 'list-card', variant].filter(Boolean).join(' ')}>
      <SectionTitle icon={icon} title={title} />
      {children}
    </section>
  );
}
