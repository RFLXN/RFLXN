import type { TitledChildrenProps } from './types';

export function WorkstyleItem({ children, title }: TitledChildrenProps) {
  return (
    <div>
      <b>{title}</b>
      <span>{children}</span>
    </div>
  );
}
