import { ChipLine } from './ChipLine';
import type { ProjectItemProps } from './types';

export function ProjectItem({ children, chips, featured = false, href, meta, title }: ProjectItemProps) {
  return (
    <article className={featured ? 'project-item featured' : 'project-item'}>
      <div className="project-head">
        <h3>
          {href ? (
            <a className="project-title-link" href={href} target="_blank" rel="noreferrer">
              {title}
            </a>
          ) : (
            title
          )}
        </h3>
        <div className="meta">{meta}</div>
      </div>
      <div className="project-body">{children}</div>
      <ChipLine chips={chips} />
    </article>
  );
}
