import type { ChildrenProps } from './types';

type StackRowProps = ChildrenProps & {
  label: string;
};

export function StackRow({ children, label }: StackRowProps) {
  return (
    <div className="stack-row">
      <span className="stack-label">{label}</span>
      <span className="stack-items">{children}</span>
    </div>
  );
}
