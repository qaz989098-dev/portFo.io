import { Link, Navigate, useParams } from 'react-router-dom';
import Badge from '../components/Badge';
import ImageSlot from '../components/ImageSlot';
import SideNav from '../components/SideNav';
import { getProjectById } from '../data/projects';

const DECK_CONTENTS = [
  { no: 'Ⅰ', title: '기존 서비스의 문제점', href: 'problem' },
  { no: 'Ⅱ', title: '프로젝트 개요', href: 'overview' },
  { no: 'Ⅲ', title: '활용 데이터', href: 'data' },
  { no: 'Ⅳ', title: '아키텍처', href: 'architecture' },
  { no: 'Ⅴ', title: '기능 소개', href: 'features' },
  { no: 'Ⅵ', title: '트러블슈팅', href: 'troubleshooting' },
  { no: 'Ⅶ', title: '느낀점', href: 'reflection' },
];

function navSections(project) {
  const isDeck = Boolean(project.problems && project.overview && project.data);
  const sections = [{ id: 'cover', label: '표지' }];

  if (project.myWork?.length) sections.push({ id: 'mine', label: '내가 한 일' });
  if (isDeck) sections.push({ id: 'contents', label: '목차' });
  if (project.existingService && project.problems) {
    sections.push({ id: 'problem', label: isDeck ? 'Ⅰ 문제점' : '문제점' });
  }
  if (project.overview) sections.push({ id: 'overview', label: isDeck ? 'Ⅱ 개요' : '개요' });
  if (project.role?.length) sections.push({ id: 'role', label: '담당' });
  if (project.data) sections.push({ id: 'data', label: isDeck ? 'Ⅲ 데이터' : '데이터' });
  if (project.architecture) sections.push({ id: 'architecture', label: isDeck ? 'Ⅳ 아키텍처' : '아키텍처' });
  if (project.features) sections.push({ id: 'features', label: isDeck ? 'Ⅴ 기능' : '기능' });
  if (project.gallery?.some((item) => item.src)) sections.push({ id: 'screens', label: '화면' });
  if (project.troubleshooting?.length) {
    sections.push({ id: 'troubleshooting', label: isDeck ? 'Ⅵ 트러블슈팅' : '트러블슈팅' });
  }
  if (project.reflection) sections.push({ id: 'reflection', label: isDeck ? 'Ⅶ 느낀점' : '느낀점' });

  return sections;
}

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
  const isDeck = Boolean(project.problems && project.overview && project.data);
  const eyebrow =
    project.eyebrow ??
    (project.type === 'solo'
      ? '개인 프로젝트 · 2026'
      : `${project.teamLabel} · Final Project Presentation · 2026`);

  return (
    <article className="detail deck">
      <SideNav sections={navSections(project)} />

      <div className="container detail__container">
        <header className="deck-hero" id="cover">
          <p className="deck-hero__eyebrow">{eyebrow}</p>
          {project.enTitle ? <p className="deck-hero__en">{project.enTitle}</p> : null}
          <h1 className="deck-hero__title">{project.title}</h1>
          {project.subtitle ? <p className="deck-hero__lead">{project.subtitle}</p> : null}
          {(project.teamLabel || project.members?.length) && (
            <p className="deck-hero__members">
              {[project.teamLabel, project.members?.join(' · ')].filter(Boolean).join(' · ')}
            </p>
          )}
          <div className="deck-hero__meta">
            {project.badge && <Badge variant={project.type === 'solo' ? 'accent' : 'default'}>{project.badge}</Badge>}
            <span>{project.period}</span>
          </div>
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
          {project.repoNote && <p className="deck-hero__note">{project.repoNote}</p>}
        </header>

        {coverSrc && (
          <ImageSlot
            projectId={project.id}
            slot="hero"
            variant="hero"
            caption={project.coverCaption || gallery[0]?.caption || project.title}
            imageSrc={coverSrc}
          />
        )}

        {project.myWork?.length > 0 && (
          <section className="detail__section detail__section--highlight" id="mine">
            <SectionBanner no="WORK" title="내가 한 일" en="WHAT I WORKED ON" />
            <p className="detail__caption">
              {project.type === 'solo'
                ? '이 사이트에서 제가 만든 부분입니다.'
                : '팀 기능은 아래 담당에 모두 적었습니다. 여기서는 제가 주로 붙인 부분입니다.'}
            </p>
            <ul className="model-grid">
              {project.myWork.map((item) => (
                <li key={item.title}>
                  <strong>{item.title}</strong>
                  <p>{item.body}</p>
                </li>
              ))}
            </ul>
          </section>
        )}

        {isDeck && (
          <section className="detail__section" id="contents">
            <SectionBanner no="CONTENTS" title="목차" />
            <ol className="deck-toc">
              {DECK_CONTENTS.map((item) => (
                <li key={item.href}>
                  <a href={`#${item.href}`}>
                    <span>{item.no}</span>
                    {item.title}
                  </a>
                </li>
              ))}
            </ol>
          </section>
        )}

        {project.existingService && project.problems && (
          <section className="detail__section" id="problem">
            <SectionBanner no="01" title="기존 서비스의 문제점" en="EXISTING SERVICE ISSUES" />
            <h3 className="detail__h3">기존 서비스</h3>
            <div className="service-card service-card--text">
              <div className="service-card__body">
                <p className="service-card__name">{project.existingService.name}</p>
                <p className="detail__prose">{project.existingService.description}</p>
                {project.existingService.url && (
                  <a
                    className="detail__ext-link"
                    href={project.existingService.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    생활안전지도 바로가기
                  </a>
                )}
              </div>
            </div>
            <h3 className="detail__h3">불편사항</h3>
            <ul className="issue-grid issue-grid--five">
              {project.problems.map((item) => (
                <li key={item.title} className="issue-card">
                  <span className="deck-no">{item.no}</span>
                  <strong>{item.title}</strong>
                  <p className="issue-card__lead">{item.lead}</p>
                  <p>{item.body}</p>
                </li>
              ))}
            </ul>
          </section>
        )}

        {project.overview && (
          <section className="detail__section" id="overview">
            <SectionBanner no="02" title="프로젝트 개요" en="WHY WE BUILT IT" />
            {project.overview.intro && <p className="detail__prose">{project.overview.intro}</p>}
            {project.whyBuilt?.length > 0 && (
              <>
                <h3 className="detail__h3">Problem → Solution</h3>
                <ul className="why-list">
                  {project.whyBuilt.map((item) => (
                    <li key={item.problem} className="why-card">
                      <div>
                        <p className="why-card__kicker">PROBLEM</p>
                        <strong>{item.problem}</strong>
                        <p>{item.problemBody}</p>
                      </div>
                      <div>
                        <p className="why-card__kicker why-card__kicker--sol">SOLUTION</p>
                        <strong>{item.solution}</strong>
                        <p>{item.solutionBody}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </>
            )}
            {project.featureMatrix?.length > 0 && (
              <>
                <h3 className="detail__h3">제공하는 서비스</h3>
                <p className="detail__caption">● 지원 · ○ 미지원</p>
                <div className="matrix">
                  <div className="matrix__head">
                    <span>기능</span>
                    <span>Web</span>
                    <span>App</span>
                  </div>
                  {project.featureMatrix.map((row) => (
                    <div key={row.name} className="matrix__row">
                      <div>
                        <strong>{row.name}</strong>
                        <p>{row.desc}</p>
                      </div>
                      <span>{row.web ? '●' : '○'}</span>
                      <span>{row.app ? '●' : '○'}</span>
                    </div>
                  ))}
                </div>
              </>
            )}
            {project.appCore?.length > 0 && (
              <>
                <h3 className="detail__h3">App 핵심 기능</h3>
                <ul className="model-grid">
                  {project.appCore.map((item) => (
                    <li key={item.code}>
                      <span className="deck-no">{item.code}</span>
                      <strong>{item.title}</strong>
                      <p>{item.body}</p>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </section>
        )}

        {project.role?.length > 0 && (
          <section className="detail__section detail__section--highlight" id="role">
            <SectionBanner
              no="ROLE"
              title="담당 업무"
              en={project.type === 'solo' ? 'SOLO' : 'TEAM 3 · SAFETY'}
            />
            {project.roleNote && <p className="detail__caption">{project.roleNote}</p>}
            <ul className="detail__list">
              {project.role.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
        )}

        {project.data && (
          <section className="detail__section" id="data">
            <SectionBanner no="03" title="활용 데이터" en="SAFETY STRENGTH — DATA PIPELINE" />
            <h3 className="detail__h3">데이터 수집</h3>
            <ul className="count-row">
              {project.data.counts?.map((item) => (
                <li key={item.label}>
                  <strong>{item.value}</strong>
                  <span>{item.label}</span>
                </li>
              ))}
            </ul>
            <p className="detail__prose">{project.data.scale}</p>
            <h3 className="detail__h3">안전 등급 모델</h3>
            <ol className="pipeline">
              {project.data.pipeline.map((step, index) => (
                <li key={step}>
                  <span className="pipeline__n">{index + 1}</span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
            {project.data.weights && (
              <p className="detail__prose">
                시설군 가중치 {project.data.weights}. {project.data.formula}
              </p>
            )}
            <ul className="model-grid">
              {project.data.model.map((item) => (
                <li key={item.title}>
                  <strong>{item.title}</strong>
                  <p>{item.body}</p>
                </li>
              ))}
            </ul>
          </section>
        )}

        {project.architecture && (
          <section className="detail__section" id="architecture">
            <SectionBanner no="04" title="아키텍처" en="SYSTEM ARCHITECTURE" />
            {(project.architecture.diagrams ?? []).map((diagram) => (
              <ImageSlot
                key={diagram.src}
                projectId={project.id}
                slot="architecture"
                variant="diagram"
                caption={diagram.caption}
                imageSrc={diagram.src}
              />
            ))}
            {project.architecture.frontend?.length > 0 && (
              <>
                <h3 className="detail__h3">클라이언트</h3>
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
            {project.architecture.stackNote && (
              <>
                <h3 className="detail__h3">메인 백엔드</h3>
                <p className="detail__prose">{project.architecture.stackNote}</p>
              </>
            )}
            {(project.architecture.restBackend || project.architecture.aiBackend) && (
              <div className="split-2">
                {project.architecture.restBackend && (
                  <div className="panel platform-col">
                    <h4>REST API</h4>
                    <ul>
                      {project.architecture.restBackend.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {project.architecture.aiBackend && (
                  <div className="panel platform-col">
                    <h4>AI 서브프로세스</h4>
                    <ul>
                      {project.architecture.aiBackend.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                    <p className="detail__caption">
                      제보 사진은 YuNet으로 모자이크합니다. 운영 중인 등급 산출은 규칙 기반이며, RandomForest는 참고용입니다.
                    </p>
                  </div>
                )}
              </div>
            )}
            {(project.architecture.dbNote || project.architecture.tables) && (
              <>
                <h3 className="detail__h3">데이터 저장</h3>
                {project.architecture.dbNote && <p className="detail__prose">{project.architecture.dbNote}</p>}
                {project.architecture.tables && (
                  <ul className="erd">
                    {project.architecture.tables.map((table) => (
                      <li key={table.name}>
                        <strong>{table.name}</strong>
                        <span>{table.fields}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </>
            )}
            {project.architecture.integrations?.length > 0 && (
              <>
                <h3 className="detail__h3">외부 API</h3>
                <ul className="model-grid">
                  {project.architecture.integrations.map((item) => (
                    <li key={item.code}>
                      <span className="deck-no">{item.code}</span>
                      <strong>{item.title}</strong>
                      <p>{item.body}</p>
                    </li>
                  ))}
                </ul>
              </>
            )}
            {project.architecture.chat && (
              <>
                <h3 className="detail__h3">{project.architecture.chat.title}</h3>
                <p className="detail__prose">{project.architecture.chat.body}</p>
                <ul className="tag-list">
                  {project.architecture.chat.items.map((item) => (
                    <li key={item} className="tag">{item}</li>
                  ))}
                </ul>
              </>
            )}
          </section>
        )}

        {project.features && (
          <section className="detail__section" id="features">
            <SectionBanner no="05" title="기능 소개" en="FEATURE OVERVIEW" />
            {project.features.common && (
              <>
                <h3 className="detail__h3">공통</h3>
                <FeatureGroups groups={project.features.common} />
              </>
            )}
            {project.features.app && (
              <>
                <h3 className="detail__h3">App</h3>
                <FeatureGroups groups={project.features.app} />
              </>
            )}
            {project.features.web && (
              <>
                <h3 className="detail__h3">Web</h3>
                <FeatureGroups groups={project.features.web} />
              </>
            )}
          </section>
        )}

        {gallery.some((item) => item.src) && (
          <section className="detail__section" id="screens">
            <SectionBanner no="SCREEN" title="화면" en="WEB · APP" />
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

        {project.troubleshooting?.length > 0 && (
          <section className="detail__section" id="troubleshooting">
            <SectionBanner no="06" title="트러블슈팅" en="PROBLEM → CAUSE → FIX" />
            <div className="trouble-stack">
              {project.troubleshooting.map((item) => (
                <article key={item.no} className="pcf">
                  <p className="pcf__head">
                    CASE {item.no} · {item.tag}
                  </p>
                  <h3>{item.title}</h3>
                  <dl>
                    <div>
                      <dt>PROBLEM</dt>
                      <dd>{item.problem}</dd>
                    </div>
                    <div>
                      <dt>CAUSE</dt>
                      <dd>{item.cause}</dd>
                    </div>
                    <div>
                      <dt>FIX</dt>
                      <dd>{item.fix}</dd>
                    </div>
                  </dl>
                </article>
              ))}
            </div>
          </section>
        )}

        {project.reflection && (
          <section className="detail__section" id="reflection">
            <SectionBanner no="07" title="느낀점" en="RETROSPECTIVE" />
            <blockquote className="quote quote--mine">
              <p>{project.reflection}</p>
              <cite>박상우</cite>
            </blockquote>
            {project.quotes?.some((item) => !item.mine) && (
              <ul className="quote-grid">
                {project.quotes
                  .filter((item) => !item.mine)
                  .map((item) => (
                    <li key={item.name}>
                      <strong>{item.name}</strong>
                      <p>{item.body}</p>
                    </li>
                  ))}
              </ul>
            )}
            {project.members?.length > 0 && (
              <p className="deck-thanks">감사합니다 · {project.members.join(' · ')}</p>
            )}
          </section>
        )}

        <div className="detail__nav">
          <Link to="/" className="btn btn--ghost">
            ← 목록
          </Link>
        </div>
      </div>
    </article>
  );
}

function SectionBanner({ no, title, en }) {
  return (
    <header className="section-banner">
      <p className="section-banner__no">SECTION {no}</p>
      <h2>{title}</h2>
      {en ? <p className="section-banner__en">{en}</p> : null}
    </header>
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
