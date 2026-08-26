import { Link } from 'react-router-dom';
import Badge from './Badge';
import ImageSlot from './ImageSlot';

export default function ProjectCard({ project }) {
  const coverSrc = project.coverSrc || project.thumbSrc || project.gallery?.find((item) => item.src)?.src || null;
  const links = project.links?.length
    ? project.links
    : project.github
      ? [{ label: 'GitHub', href: project.github }]
      : [];

  return (
    <Link to={`/projects/${project.id}`} className="project-card">
      <div className="project-card__thumb">
        <ImageSlot
          projectId={project.id}
          slot="thumb"
          variant="thumb"
          caption={null}
          imageSrc={coverSrc}
        />
      </div>
      <div className="project-card__body">
        <div className="project-card__meta">
          <h2 className="project-card__title">{project.title}</h2>
          {project.badge && (
            <Badge variant={project.type === 'solo' ? 'accent' : 'default'}>
              {project.badge}
            </Badge>
          )}
        </div>
        {project.subtitle && <p className="project-card__subtitle">{project.subtitle}</p>}
        <p className="project-card__summary">{project.summary}</p>
        <p className="project-card__period">{project.period}</p>
        {project.stack?.length > 0 && (
          <ul className="tag-list">
            {project.stack.map((tech) => (
              <li key={tech} className="tag">{tech}</li>
            ))}
          </ul>
        )}
        <div className="project-card__actions">
          <span className="btn btn--ghost">상세 보기</span>
          {links.map((link) => (
            <button
              key={link.href}
              type="button"
              className="btn btn--primary"
              onClick={(event) => {
                event.preventDefault();
                event.stopPropagation();
                window.open(link.href, '_blank', 'noopener,noreferrer');
              }}
            >
              {link.label}
            </button>
          ))}
        </div>
      </div>
    </Link>
  );
}
