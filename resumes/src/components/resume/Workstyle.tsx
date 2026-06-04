import type { ChildrenProps } from './types';

export function Workstyle({ children }: ChildrenProps) {
  return (
    <section className="workstyle" style={{ marginTop: '2.5mm' }}>
      {children}
    </section>
  );
}
