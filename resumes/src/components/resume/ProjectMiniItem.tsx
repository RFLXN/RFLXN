import type { ProjectMiniItemProps } from './types';

export function ProjectMiniItem({ children, href, title }: ProjectMiniItemProps) {
  return (
    <div className="project-mini-bar">
      <h4>
        {href ? (
          <a className="project-title-link" href={href} target="_blank" rel="noreferrer">
            {title}
          </a>
        ) : (
          title
        )}
      </h4>
      <p>{children}</p>
    </div>
  );
}
