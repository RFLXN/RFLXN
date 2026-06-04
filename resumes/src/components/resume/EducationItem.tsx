import type { ChildrenProps } from './types';

type EducationItemProps = ChildrenProps & {
  period: string;
};

export function EducationItem({ children, period }: EducationItemProps) {
  return (
    <div className="edu-item">
      <div className="period">{period}</div>
      {children}
    </div>
  );
}
