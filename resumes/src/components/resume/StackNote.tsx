import type { ChildrenProps } from './types';

export function StackNote({ children }: ChildrenProps) {
  return <p className="stack-note">{children}</p>;
}
