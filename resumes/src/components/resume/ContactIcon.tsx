import { CodeIcon, GitHubIcon, LinkIcon, MailIcon } from './icons';
import type { Contact } from './types';

export function ContactIcon({ icon }: { icon: Contact['icon'] }) {
  if (icon === 'code') return <CodeIcon />;
  if (icon === 'github') return <GitHubIcon />;
  if (icon === 'link') return <LinkIcon />;
  if (icon === 'mail') return <MailIcon />;

  return null;
}
