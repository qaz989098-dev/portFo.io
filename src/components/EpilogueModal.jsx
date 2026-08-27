import { useEffect } from 'react';

export default function EpilogueModal({ open, published, onClose }) {
  const paragraphs = Array.isArray(published)
    ? published.filter(Boolean)
    : published
      ? [published]
      : [];

  useEffect(() => {
    if (!open) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="modal" role="presentation" onClick={onClose}>
      <div
        className="modal__dialog modal__dialog--epilogue"
        role="dialog"
        aria-modal="true"
        aria-labelledby="epilogue-modal-title"
        onClick={(event) => event.stopPropagation()}
      >
        <header className="modal__header">
          <h3 id="epilogue-modal-title" className="modal__title">
            에필로그
          </h3>
          <button type="button" className="modal__close" onClick={onClose} aria-label="닫기">
            ×
          </button>
        </header>
        <div className="modal__body">
          <div className="epilogue-body">
            {paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
