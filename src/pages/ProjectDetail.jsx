import { Link, Navigate, useParams } from 'react-router-dom';
import Badge from '../components/Badge';
import ImageSlot from '../components/ImageSlot';
import { getProjectById } from '../data/projects';

export default function ProjectDetail() {
  const { id } = useParams();
  const project = getProjectById(id);

  if (!project) {
    return <Navigate to="/" replace />;
  }

  return (
    <article className="detail">
      <div className="container detail__container">
        <ImageSlot
          projectId={project.id}
          slot="hero"
          variant="hero"
          caption={`${project.title} 대표 이미지`}
          imageSrc={project.heroSrc ?? project.gallery?.[0]?.src ?? null}
        />

        <header className="detail__header">
          <div className="detail__meta">
            <h1 className="detail__title">{project.title}</h1>
            {project.badge && (
              <Badge variant={project.type === 'solo' ? 'accent' : 'default'}>
                {project.badge}
              </Badge>
            )}
          </div>
          <p className="detail__period">{project.period}</p>
          <p className="detail__summary">{project.summary}</p>
          <a
            href={project.github}
            className="btn btn--primary"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub 저장소
          </a>
        </header>

        <section className="detail__section detail__section--highlight">
          <h2>내가 한 일</h2>
          <ul className="detail__list">
            {project.role.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        {project.stack?.length > 0 && (
          <section className="detail__section">
            <h2>기술 스택</h2>
            <ul className="tag-list">
              {project.stack.map((tech) => (
                <li key={tech} className="tag">{tech}</li>
              ))}
            </ul>
          </section>
        )}

        <section className="detail__section">
          <h2>주요 기능</h2>
          <ul className="detail__list">
            {project.features.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        {project.metrics && (
          <section className="detail__section">
            <h2>성과 · 지표</h2>
            <dl className="metrics">
              {project.metrics.map(({ label, value }) => (
                <div key={label} className="metrics__item">
                  <dt>{label}</dt>
                  <dd>{value}</dd>
                </div>
              ))}
            </dl>
          </section>
        )}

        <section className="detail__section">
          <h2>스크린샷</h2>
          {project.gallery.some((item) => !item.src) && (
            <p className="detail__gallery-note">아래 슬롯에 추후 스크린샷을 추가할 수 있습니다.</p>
          )}
          <div className="gallery">
            {project.gallery.map((item) => (
              <ImageSlot
                key={item.slot}
                projectId={project.id}
                slot={item.slot}
                caption={item.caption}
                imageSrc={item.src ?? null}
              />
            ))}
          </div>
        </section>

        <div className="detail__nav">
          <Link to="/" className="btn btn--ghost">
            ← 프로젝트 목록
          </Link>
        </div>
      </div>
    </article>
  );
}
