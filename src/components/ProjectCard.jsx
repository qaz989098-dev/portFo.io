import { Link } from 'react-router-dom';
import Badge from './Badge';
import ImageSlot from './ImageSlot';

export default function ProjectCard({ project }) {
  const coverSrc = project.coverSrc || project.gallery?.find((item) => item.src)?.src || null;

  return (
    <article className="project-card">
      <Link to={`/projects/${project.id}`} className="project-card__media" aria-label={`${project.title} 예시 사진`}>
        <ImageSlot
          slot="cover"
          variant="thumb"
          imageSrc={coverSrc}
          caption={project.title}
        />
      </Link>
      <div className="project-card__body">
        <div className="project-card__meta">
          <h2 className="project-card__title">
            <Link to={`/projects/${project.id}`}>{project.title}</Link>
          </h2>
          {project.badge && (
            <Badge variant={project.type === 'solo' ? 'accent' : 'default'}>
              {project.badge}
            </Badge>
          )}
        </div>
        <p className="project-card__subtitle">{project.subtitle}</p>
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
          <Link to={`/projects/${project.id}`} className="btn btn--primary">
            상세 보기
          </Link>
          {project.links?.length > 0 ? (
            project.links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="btn btn--ghost"
                target="_blank"
                rel="noopener noreferrer"
              >
                {link.label}
              </a>
            ))
          ) : project.github ? (
            <a
              href={project.github}
              className="btn btn--ghost"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
          ) : null}
        </div>
      </div>
    </article>
  );
}
