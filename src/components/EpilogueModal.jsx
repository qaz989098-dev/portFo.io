import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

export default function EpilogueModal({ open, published, onClose }) {
  const ignoreClickRef = useRef(true);
  const paragraphs = Array.isArray(published)
    ? published.filter(Boolean)
    : published
      ? [published]
      : [];

  useEffect(() => {
    if (!open) return undefined;

    ignoreClickRef.current = true;
    const allowClick = window.setTimeout(() => {
      ignoreClickRef.current = false;
    }, 250);

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.clearTimeout(allowClick);
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [open, onClose]);

  if (!open) return null;

  return createPortal(
    <div
      className="modal"
      role="presentation"
      onClick={() => {
        if (ignoreClickRef.current) return;
        onClose();
      }}
    >
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
    </div>,
    document.body,
  );
}
