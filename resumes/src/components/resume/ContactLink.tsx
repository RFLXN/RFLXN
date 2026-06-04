import { ContactIcon } from './ContactIcon';
import type { Contact } from './types';

export function ContactLink({ contact }: { contact: Contact }) {
  const children = (
    <>
      <ContactIcon icon={contact.icon} />
      {contact.label}
    </>
  );

  if (contact.href) {
    return (
      <a className="contact" href={contact.href}>
        {children}
      </a>
    );
  }

  return <span className="contact">{children}</span>;
}
