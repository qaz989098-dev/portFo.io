import { useEffect, useMemo, useState } from 'react';
import { profile, projects } from '../data/projects';
import ProjectCard from '../components/ProjectCard';
import SkillGroup from '../components/SkillGroup';
import ResumeAttach from '../components/ResumeAttach';
import TrainingDetailModal from '../components/TrainingDetailModal';
import EpilogueModal from '../components/EpilogueModal';
import SideNav from '../components/SideNav';
import Badge from '../components/Badge';

export default function Home() {
  const [selectedTraining, setSelectedTraining] = useState(null);
  const [epilogueOpen, setEpilogueOpen] = useState(false);

  const introText = Array.isArray(profile.intro)
    ? profile.intro.filter(Boolean).join(' ')
    : profile.intro;

  const navSections = useMemo(() => {
    const sections = [{ id: 'about', label: 'About' }];

    if (profile.education || profile.trainings?.length > 0) {
      sections.push({ id: 'education', label: 'Education' });
    }

    if (profile.skills?.length > 0 || profile.learningSkills?.items?.length > 0) {
      sections.push({ id: 'skills', label: 'Skills', targetId: 'skills-list', scrollOffset: 56 });
    }

    sections.push({ id: 'projects', label: 'Projects', targetId: 'projects-list' });
    sections.push({ id: 'epilogue', label: 'Epilogue' });

    return sections;
  }, []);

  useEffect(() => {
    if (!selectedTraining || epilogueOpen) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') setSelectedTraining(null);
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedTraining, epilogueOpen]);

  return (
    <>
      <SideNav sections={navSections} />

      <section className="hero" id="about">
        <div className="container">
          <div className="panel panel--hero">
            <div className="hero__inner">
              {profile.photoSrc && (
                <img
                  className="hero__photo"
                  src={profile.photoSrc}
                  alt={`${profile.name} 프로필 사진`}
                  width={140}
                  height={175}
                />
              )}
              <div className="hero__content">
                <p className="hero__label">Portfolio</p>
                <h1 className="hero__name">{profile.name}</h1>
                {profile.role && <p className="hero__role">{profile.role}</p>}
                {(profile.education || profile.location) && (
                  <p className="hero__education">
                    {profile.education || profile.location}
                  </p>
                )}
                {Array.isArray(profile.intro)
                  ? profile.intro.filter(Boolean).map((paragraph) => (
                      <p key={paragraph} className="hero__intro">
                        {paragraph}
                      </p>
                    ))
                  : introText ? (
                    <p className="hero__intro">{introText}</p>
                  ) : (
                    <p className="hero__intro hero__intro--placeholder">자기소개를 추가해 주세요.</p>
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
                </div>
                <ResumeAttach resume={profile.resume} />
              </div>
            </div>
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

        {(profile.skills?.length > 0 || profile.learningSkills?.items?.length > 0) && (
          <section className="section" id="skills">
            <h2 className="section__title">Skills</h2>
            <span id="skills-list" className="section-anchor" aria-hidden="true" />
            <div className="skills-layout">
              <div className="panel skills-panel">
                <div className="skills-grid">
                  {profile.skills?.map((group) => (
                    <SkillGroup key={group.label} label={group.label} items={group.items} />
                  ))}
                </div>
                {profile.skillsNote && (
                  <p className="skills-panel-note">{profile.skillsNote}</p>
                )}
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

        <section className="section" id="epilogue">
          <h2 className="section__title">Epilogue</h2>
          <div className="panel epilogue-panel">
            <div className="epilogue-body">
              {profile.epilogue.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <button
              type="button"
              className="epilogue-btn"
              onClick={(event) => {
                event.preventDefault();
                event.stopPropagation();
                setEpilogueOpen(true);
              }}
            >
              에필로그
            </button>
          </div>
        </section>
      </div>

      <TrainingDetailModal
        training={selectedTraining}
        onClose={() => setSelectedTraining(null)}
      />
      <EpilogueModal
        open={epilogueOpen}
        published={profile.epilogue}
        onClose={() => setEpilogueOpen(false)}
      />
    </>
  );
}
