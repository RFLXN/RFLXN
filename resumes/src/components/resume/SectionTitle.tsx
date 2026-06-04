import { SectionIcon } from './icons';
import type { SectionTitleProps } from './types';

export function SectionTitle({ icon, title }: SectionTitleProps) {
  return (
    <h2 className="section-title">
      <span className="icon">
        <SectionIcon name={icon} />
      </span>
      {title}
    </h2>
  );
}
