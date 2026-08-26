import { useEffect, useState } from 'react';

export default function ImageSlot({
  projectId,
  slot,
  caption,
  variant = 'gallery',
  imageSrc = null,
  zoomable = false,
}) {
  const [open, setOpen] = useState(false);
  const label = caption || '스크린샷 (추가 예정)';
  const initial = (projectId || 'PF').slice(0, 2).toUpperCase();
  const canZoom = Boolean(imageSrc && (zoomable || variant === 'diagram'));

  useEffect(() => {
    if (!open) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') setOpen(false);
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [open]);

  if (imageSrc) {
    return (
      <figure className={`image-slot image-slot--${variant}`} data-slot={slot}>
        {canZoom ? (
          <button
            type="button"
            className="image-slot__zoom"
            onClick={() => setOpen(true)}
            aria-label={`${label} 확대`}
          >
            <img src={imageSrc} alt={label} loading="lazy" />
          </button>
        ) : (
          <img src={imageSrc} alt={label} loading="lazy" />
        )}
        {variant !== 'thumb' && caption ? <figcaption>{caption}</figcaption> : null}
        {open ? (
          <div className="lightbox" role="presentation" onClick={() => setOpen(false)}>
            <button type="button" className="lightbox__close" aria-label="닫기">
              ×
            </button>
            <img
              src={imageSrc}
              alt={label}
              onClick={(event) => event.stopPropagation()}
            />
          </div>
        ) : null}
      </figure>
    );
  }

  return (
    <figure className={`image-slot image-slot--${variant} image-slot--placeholder`} data-slot={slot}>
      <div className="image-slot__placeholder" aria-hidden="true">
        <span className="image-slot__initial">{initial}</span>
        <span className="image-slot__hint">이미지 추가 예정</span>
      </div>
      {variant !== 'thumb' ? <figcaption>{label}</figcaption> : null}
    </figure>
  );
}
