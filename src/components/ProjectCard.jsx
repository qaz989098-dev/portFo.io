import { Link } from 'react-router-dom';
import Badge from './Badge';
import ImageSlot from './ImageSlot';

export default function ProjectCard({ project }) {
  const coverSrc = project.coverSrc || project.thumbSrc || project.gallery?.find((item) => item.src)?.src || null;

  return (
    <article className="project-card">
      <Link to={`/projects/${project.id}`} className="project-card__thumb-link">
        <ImageSlot
          projectId={project.id}
          slot="thumb"
          variant="thumb"
          caption={null}
          imageSrc={coverSrc}
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
          <Link to={`/projects/${project.id}`} className="btn btn--ghost">
            상세보기
          </Link>
          {project.github && (
            <a
              href={project.github}
              className="btn btn--primary"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
