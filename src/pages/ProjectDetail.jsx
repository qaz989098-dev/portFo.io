import { Link, Navigate, useParams } from 'react-router-dom';
import Badge from '../components/Badge';
import ImageSlot from '../components/ImageSlot';
import SideNav from '../components/SideNav';
import { getProjectById } from '../data/projects';

const TOC = [
  { id: 'problem', label: '문제점' },
  { id: 'overview', label: '개요' },
  { id: 'role', label: '담당' },
  { id: 'data', label: '데이터' },
  { id: 'architecture', label: '아키텍처' },
  { id: 'features', label: '기능' },
  { id: 'screens', label: '화면' },
  { id: 'troubleshooting', label: '트러블슈팅' },
  { id: 'reflection', label: '정리' },
];

export default function ProjectDetail() {
  const { id } = useParams();
  const project = getProjectById(id);

  if (!project) {
    return <Navigate to="/" replace />;
  }

  const links = project.links?.length
    ? project.links
    : project.github
      ? [{ label: 'GitHub', href: project.github }]
      : [];

  const gallery = project.gallery ?? [];
  const coverSrc = project.coverSrc || gallery.find((item) => item.src)?.src || null;

  return (
    <article className="detail">
      <SideNav sections={TOC} />

      <div className="container detail__container">
        <ImageSlot
          projectId={project.id}
          slot="hero"
          variant="hero"
          caption={`${project.title} 대표 이미지`}
          imageSrc={coverSrc}
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
          {project.stack?.length > 0 && (
            <ul className="tag-list">
              {project.stack.map((tech) => (
                <li key={tech} className="tag">{tech}</li>
              ))}
            </ul>
          )}
          <div className="detail__actions">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="btn btn--primary"
                target="_blank"
                rel="noopener noreferrer"
              >
                {link.label}
              </a>
            ))}
          </div>
        </header>

        <section className="detail__section" id="problem">
          <h2>1. 기존 서비스의 문제점</h2>
          <h3 className="detail__h3">기존 서비스</h3>
          <div className="service-card service-card--text">
            <div className="service-card__body">
              <p className="service-card__name">{project.existingService.name}</p>
              <p className="detail__prose">{project.existingService.description}</p>
              <a
                className="detail__ext-link"
                href={project.existingService.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                생활안전지도 바로가기
              </a>
            </div>
          </div>
          <h3 className="detail__h3">문제점</h3>
          <ul className="issue-grid">
            {project.problems.map((item) => (
              <li key={item.title} className="issue-card">
                <strong>{item.title}</strong>
                <p>{item.body}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="detail__section" id="overview">
          <h2>2. 프로젝트 개요</h2>
          <p className="detail__prose">{project.overview.intro}</p>
          <h3 className="detail__h3">제공하는 서비스</h3>
          <ul className="detail__list">
            {project.overview.services.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <h3 className="detail__h3">핵심 기능</h3>
          <ul className="hero__focus detail__focus">
            {project.overview.core.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <h3 className="detail__h3">Web / App</h3>
          <div className="split-3">
            <PlatformCol title="공통" items={project.overview.platforms.common} />
            <PlatformCol title="App" items={project.overview.platforms.app} />
            <PlatformCol title="Web" items={project.overview.platforms.web} />
          </div>
        </section>

        {project.role?.length > 0 && (
          <section className="detail__section detail__section--highlight" id="role">
            <h2>담당 업무</h2>
            <ul className="detail__list">
              {project.role.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
        )}

        <section className="detail__section" id="data">
          <h2>3. 활용 데이터</h2>
          <h3 className="detail__h3">데이터 수집</h3>
          <p className="detail__kicker">출처</p>
          <ul className="detail__list">
            {project.data.sources.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p className="detail__kicker">주요 데이터</p>
          <ul className="hero__focus detail__focus">
            {project.data.examples.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p className="detail__prose">{project.data.scale}</p>

          <h3 className="detail__h3">안전등급 모델</h3>
          <ol className="pipeline">
            {project.data.pipeline.map((step, index) => (
              <li key={step}>
                <span className="pipeline__n">{index + 1}</span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
          <ul className="model-grid">
            {project.data.model.map((item) => (
              <li key={item.title}>
                <strong>{item.title}</strong>
                <p>{item.body}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="detail__section" id="architecture">
          <h2>4. 아키텍처</h2>
          <h3 className="detail__h3">시스템 구조</h3>
          <div className="arch">
            <div className="arch__row">
              {project.architecture.nodes.map((node) => (
                <span key={node} className="arch__node">{node}</span>
              ))}
            </div>
            <p className="arch__arrow" aria-hidden="true">↓</p>
            <div className="arch__row">
              {project.architecture.extras.map((node) => (
                <span key={node} className="arch__node arch__node--soft">{node}</span>
              ))}
            </div>
          </div>
          <p className="detail__prose">{project.architecture.stackNote}</p>

          {project.architecture.frontend?.length > 0 && (
            <>
              <h3 className="detail__h3">프론트엔드</h3>
              <ul className="model-grid">
                {project.architecture.frontend.map((item) => (
                  <li key={item.title}>
                    <strong>{item.title}</strong>
                    <p>{item.body}</p>
                  </li>
                ))}
              </ul>
            </>
          )}

          <h3 className="detail__h3">백엔드</h3>
          <ul className="model-grid">
            {project.architecture.backend.map((item) => (
              <li key={item.title}>
                <strong>{item.title}</strong>
                <p>{item.body}</p>
              </li>
            ))}
          </ul>

          <h3 className="detail__h3">DB 관리</h3>
          {project.architecture.dbNote && (
            <p className="detail__prose">{project.architecture.dbNote}</p>
          )}
          <ul className="erd">
            {project.architecture.tables.map((table) => (
              <li key={table.name}>
                <strong>{table.name}</strong>
                <span>{table.fields}</span>
              </li>
            ))}
          </ul>
          <p className="detail__caption">grid ← infrastructures / report / feedback · user → report, feedback, city_events · device_tokens</p>
        </section>

        <section className="detail__section" id="features">
          <h2>5. 기능</h2>
          <h3 className="detail__h3">공통</h3>
          <FeatureGroups groups={project.features.common} />
          <h3 className="detail__h3">App</h3>
          <FeatureGroups groups={project.features.app} />
          <h3 className="detail__h3">Web</h3>
          <FeatureGroups groups={project.features.web} />
        </section>

        {gallery.length > 0 && (
          <section className="detail__section" id="screens">
            <h2>화면</h2>
            {gallery.some((item) => !item.src) && (
              <p className="detail__gallery-note">
                예시 사진 자리입니다. 스크린샷을 넣으면 이 칸에 표시됩니다.
              </p>
            )}
            <div className="gallery">
              {gallery.map((item) => (
                <ImageSlot
                  key={item.slot}
                  projectId={project.id}
                  slot={item.slot}
                  caption={item.caption}
                  imageSrc={item.src}
                />
              ))}
            </div>
          </section>
        )}

        <section className="detail__section" id="troubleshooting">
          <h2>6. 트러블슈팅</h2>
          <div className="split-2">
            <div>
              <h3 className="detail__h3">Web</h3>
              {project.troubleshooting.web.map((item) => (
                <div key={item.title} className="trouble-item">
                  <strong>{item.title}</strong>
                  <p>{item.body}</p>
                </div>
              ))}
            </div>
            <div>
              <h3 className="detail__h3">App</h3>
              {project.troubleshooting.app.map((item) => (
                <div key={item.title} className="trouble-item">
                  <strong>{item.title}</strong>
                  <p>{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="detail__section" id="reflection">
          <h2>7. 정리</h2>
          <p className="detail__prose">{project.reflection}</p>
        </section>

        <div className="detail__nav">
          <Link to="/" className="btn btn--ghost">
            ← 목록
          </Link>
        </div>
      </div>
    </article>
  );
}

function PlatformCol({ title, items }) {
  return (
    <div className="panel platform-col">
      <h4>{title}</h4>
      <ul>
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

function FeatureGroups({ groups }) {
  return (
    <div className="split-3">
      {groups.map((group) => (
        <div key={group.title} className="panel platform-col">
          <h4>{group.title}</h4>
          <ul>
            {group.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
