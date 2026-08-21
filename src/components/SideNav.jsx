import { useEffect, useState } from 'react';

export default function SideNav({ sections }) {
  const [activeId, setActiveId] = useState(sections[0]?.id ?? '');

  useEffect(() => {
    const elements = sections
      .map(({ id }) => document.getElementById(id))
      .filter(Boolean);

    if (elements.length === 0) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible[0]) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: '-25% 0px -55% 0px', threshold: [0, 0.25, 0.5] },
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, [sections]);

  const scrollTo = ({ id, targetId, scrollOffset = 0 }) => {
    const element = document.getElementById(targetId ?? id);
    if (!element) return;

    const headerOffset = 72;
    const top = element.getBoundingClientRect().top + window.scrollY - headerOffset + scrollOffset;

    window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
  };

  return (
    <nav className="side-nav" aria-label="페이지 섹션">
      <ul className="side-nav__list">
        {sections.map(({ id, label, targetId, scrollOffset }) => (
          <li key={id}>
            <button
              type="button"
              className={`side-nav__item${activeId === id ? ' side-nav__item--active' : ''}`}
              onClick={() => scrollTo({ id, targetId, scrollOffset })}
              aria-current={activeId === id ? 'true' : undefined}
            >
              <span className="side-nav__dot" aria-hidden="true" />
              <span className="side-nav__label">{label}</span>
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
