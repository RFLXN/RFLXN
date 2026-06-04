import type { ChildrenProps } from './types';

export function ResumePage({ children }: ChildrenProps) {
  return (
    <div className="page">
      <div className="inner">{children}</div>
    </div>
  );
}
