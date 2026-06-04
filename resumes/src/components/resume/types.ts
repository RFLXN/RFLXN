import type { ReactNode } from 'react';

export type ChildrenProps = {
  children: ReactNode;
};

export type Contact = {
  href?: string;
  icon?: 'code' | 'github' | 'link' | 'mail';
  label: string;
};

export type SectionIconName = 'education' | 'keypoints' | 'profile' | 'projects' | 'stack';

export type SectionTitleProps = {
  icon: SectionIconName;
  title: ReactNode;
};

export type CardProps = SectionTitleProps &
  ChildrenProps & {
    variant?: 'soft';
  };

export type HeaderProps = ChildrenProps & {
  alias: string;
  contacts: Contact[];
  eyebrow: string;
  name: string;
};

export type ProjectItemProps = ChildrenProps & {
  chips: string[];
  featured?: boolean;
  href?: string;
  meta: string;
  title: string;
};

export type ProjectMiniItemProps = ChildrenProps & {
  href?: string;
  title: string;
};

export type TitledChildrenProps = ChildrenProps & {
  title: string;
};
