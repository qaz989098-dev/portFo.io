import { useEffect, useMemo, useState } from 'react';
import { profile, projects } from '../data/projects';
import ProjectCard from '../components/ProjectCard';
import SkillGroup from '../components/SkillGroup';
import ResumeAttach from '../components/ResumeAttach';
import TrainingDetailModal from '../components/TrainingDetailModal';
import SideNav from '../components/SideNav';
import Badge from '../components/Badge';

export default function Home() {
  const [selectedTraining, setSelectedTraining] = useState(null);

  const introParagraphs = Array.isArray(profile.intro)
    ? profile.intro.filter(Boolean)
    : profile.intro
      ? [profile.intro]
      : [];

  const profileFacts = [
    { label: '이름', value: profile.name },
    profile.birthDate && { label: '생년월일', value: profile.birthDate },
    profile.email && { label: '이메일', value: profile.email, href: `mailto:${profile.email}` },
    profile.phone && {
      label: '연락처',
      value: profile.phone,
      href: `tel:${profile.phone.replace(/\D/g, '')}`,
    },
    profile.location && { label: '거점', value: profile.location },
    profile.githubId && {
      label: 'GitHub',
      value: profile.githubId,
      href: profile.github,
    },
    { label: '희망 직무', value: 'AI · Web / App 개발' },
  ].filter(Boolean);

  const navSections = useMemo(() => {
    const sections = [{ id: 'about', label: '소개' }];

    if (profile.education || profile.trainings?.length > 0) {
      sections.push({ id: 'education', label: 'Education' });
    }

    if (profile.skills?.length > 0 || profile.stackAreas?.length > 0 || profile.learningSkills?.items?.length > 0) {
      sections.push({ id: 'skills', label: 'Skills', targetId: 'skills-list', scrollOffset: 56 });
    }

    sections.push({ id: 'projects', label: 'Projects', targetId: 'projects-list' });

    return sections;
  }, []);

  useEffect(() => {
    if (!selectedTraining) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') setSelectedTraining(null);
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedTraining]);

  return (
    <>
      <SideNav sections={navSections} />

      <section className="hero" id="about">
        <div className="container">
          <div className="panel panel--hero">
            <div className="hero__inner">
              {profile.photoSrc && (
                <aside className="identity">
                  <img
                    className="hero__photo"
                    src={profile.photoSrc}
                    alt={`${profile.name} 프로필 사진`}
                    width={160}
                    height={200}
                  />
                </aside>
              )}
              <div className="hero__content">
                <p className="hero__label">소개</p>
                <h1 className="hero__name">{profile.name}</h1>
                {profile.role && <p className="hero__role">{profile.role}</p>}
                {profile.education && (
                  <p className="hero__education">{profile.education}</p>
                )}
                {profile.focus?.length > 0 && (
                  <ul className="hero__focus">
                    {profile.focus.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                )}
                {introParagraphs.length > 0 ? (
                  <div className="hero__intro">
                    {introParagraphs.map((paragraph, index) => (
                      <p
                        key={paragraph}
                        className={index === 0 ? 'hero__intro-lead' : undefined}
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>
                ) : (
                  <p className="hero__intro hero__intro--placeholder">자기소개를 추가해 주세요.</p>
                )}
                {profile.introStack?.length > 0 && (
                  <ul className="hero__stack" aria-label="다루는 영역">
                    {profile.introStack.map((item) => (
                      <li key={item.title}>
                        <strong>{item.title}</strong>
                        <span>{item.body}</span>
                      </li>
                    ))}
                  </ul>
                )}
                <div className="hero__contact">
                  {profile.email ? (
                    <a href={`mailto:${profile.email}`} className="contact-chip contact-chip--email">
                      {profile.email}
                    </a>
                  ) : null}
                  {profile.phone ? (
                    <a href={`tel:${profile.phone.replace(/\D/g, '')}`} className="contact-chip">
                      {profile.phone}
                    </a>
                  ) : null}
                  {profile.github ? (
                    <a
                      href={profile.github}
                      className="contact-chip"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      GitHub
                    </a>
                  ) : null}
                  <ResumeAttach resume={profile.resume} />
                </div>
              </div>
            </div>
            {profileFacts.length > 0 && (
              <ul className="fact-grid" aria-label="개인 정보">
                {profileFacts.map((fact) => (
                  <li key={fact.label} className="fact-grid__item">
                    <span className="fact-grid__label">{fact.label}</span>
                    {fact.href ? (
                      <a
                        className="fact-grid__value fact-grid__value--link"
                        href={fact.href}
                        target={fact.href.startsWith('http') ? '_blank' : undefined}
                        rel={fact.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      >
                        {fact.value}
                      </a>
                    ) : (
                      <span className="fact-grid__value">{fact.value}</span>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </section>

      <div className="home-sections container">
        {(profile.education || profile.trainings?.length > 0) && (
          <section className="section" id="education">
            <h2 className="section__title">Education</h2>
            <div className="panel">
              <ul className="edu-list">
                {profile.education && (
                  <li className="edu-item">
                    <div className="edu-item__head">
                      <span className="edu-item__name">{profile.education}</span>
                      <Badge>학력</Badge>
                    </div>
                  </li>
                )}
                {profile.trainings?.map((training) => {
                  const isClickable = Boolean(training.detail);
                  const itemClassName = [
                    'edu-item',
                    training.statusType === 'ongoing' ? 'edu-item--ongoing' : '',
                    isClickable ? 'edu-item--clickable' : '',
                  ]
                    .filter(Boolean)
                    .join(' ');

                  const content = (
                    <>
                      <div className="edu-item__head">
                        <span className="edu-item__name">{training.name}</span>
                        <Badge
                          variant={
                            training.statusType === 'ongoing'
                              ? 'ongoing'
                              : training.statusType === 'completed'
                                ? 'accent'
                                : 'default'
                          }
                        >
                          {training.status}
                        </Badge>
                      </div>
                      <span className="edu-item__meta">
                        {training.org} · {training.period}
                      </span>
                      {training.summary && (
                        <p className="edu-item__summary">{training.summary}</p>
                      )}
                    </>
                  );

                  return (
                    <li key={training.id ?? training.name}>
                      {isClickable ? (
                        <button
                          type="button"
                          className={itemClassName}
                          onClick={() => setSelectedTraining(training)}
                        >
                          {content}
                        </button>
                      ) : (
                        <div className={itemClassName}>{content}</div>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          </section>
        )}

        {(profile.skills?.length > 0 ||
          profile.stackAreas?.length > 0 ||
          profile.learningSkills?.items?.length > 0) && (
          <section className="section" id="skills">
            <h2 className="section__title">Skills</h2>
            <span id="skills-list" className="section-anchor" aria-hidden="true" />
            <div className="skills-layout">
              {profile.stackAreas?.length > 0 && (
                <ul className="stack-areas">
                  {profile.stackAreas.map((area) => (
                    <li key={area.title} className="panel stack-area">
                      <h3>{area.title}</h3>
                      <p>{area.body}</p>
                      {area.items?.length > 0 && (
                        <ul>
                          {area.items.map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                      )}
                    </li>
                  ))}
                </ul>
              )}
              <div className="panel skills-panel">
                <div className="skills-grid">
                  {profile.skills?.map((group) => (
                    <SkillGroup key={group.label} label={group.label} items={group.items} />
                  ))}
                </div>
              </div>
              {profile.learningSkills?.items?.length > 0 && (
                <div className="panel panel--learning">
                  <SkillGroup
                    label={`학습 중 · ${profile.learningSkills.context}`}
                    items={profile.learningSkills.items}
                    learning
                  />
                  {profile.learningSkills.note && (
                    <p className="skills-learning-note">{profile.learningSkills.note}</p>
                  )}
                </div>
              )}
            </div>
          </section>
        )}

        <section className="section" id="projects">
          <h2 className="section__title">Projects</h2>
          <span id="projects-list" className="section-anchor" aria-hidden="true" />
          <div className="project-grid">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </section>
      </div>

      <TrainingDetailModal
        training={selectedTraining}
        onClose={() => setSelectedTraining(null)}
      />
    </>
  );
}
