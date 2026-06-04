import { ContactLink } from './ContactLink';
import type { HeaderProps } from './types';

export function Header({ alias, children, contacts, eyebrow, name }: HeaderProps) {
  return (
    <header className="header">
      <section>
        <div className="eyebrow">{eyebrow}</div>
        <h1>
          {name}
          <span className="roman">{alias}</span>
        </h1>
        <p className="role">{children}</p>
        <div className="contacts">
          {contacts.map((contact) => (
            <ContactLink key={`${contact.icon ?? ''}${contact.label}`} contact={contact} />
          ))}
        </div>
      </section>
    </header>
  );
}
