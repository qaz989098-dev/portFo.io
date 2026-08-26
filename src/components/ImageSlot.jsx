import { useEffect, useRef, useState } from 'react';

const MIN_SCALE = 1;
const MAX_SCALE = 8;

function DiagramLightbox({ src, alt, onClose }) {
  const stageRef = useRef(null);
  const [view, setView] = useState({ scale: 1, x: 0, y: 0 });
  const dragRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return undefined;

    const handleWheel = (event) => {
      event.preventDefault();
      const factor = event.deltaY < 0 ? 1.12 : 1 / 1.12;
      const rect = stage.getBoundingClientRect();
      const cx = event.clientX - rect.left - rect.width / 2;
      const cy = event.clientY - rect.top - rect.height / 2;

      setView((prev) => {
        const nextScale = Math.min(MAX_SCALE, Math.max(MIN_SCALE, prev.scale * factor));
        const applied = nextScale / prev.scale;
        if (nextScale <= MIN_SCALE) {
          return { scale: MIN_SCALE, x: 0, y: 0 };
        }
        return {
          scale: nextScale,
          x: prev.x + cx * (1 - applied),
          y: prev.y + cy * (1 - applied),
        };
      });
    };

    stage.addEventListener('wheel', handleWheel, { passive: false });
    return () => stage.removeEventListener('wheel', handleWheel);
  }, []);

  const handlePointerDown = (event) => {
    if (event.button !== 0) return;
    event.preventDefault();
    dragRef.current = {
      x: event.clientX,
      y: event.clientY,
      originX: view.x,
      originY: view.y,
    };
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event) => {
    if (!dragRef.current) return;
    setView((prev) => ({
      ...prev,
      x: dragRef.current.originX + (event.clientX - dragRef.current.x),
      y: dragRef.current.originY + (event.clientY - dragRef.current.y),
    }));
  };

  const handlePointerUp = () => {
    dragRef.current = null;
  };

  return (
    <div className="lightbox" role="presentation" onClick={onClose}>
      <button type="button" className="lightbox__close" aria-label="닫기">
        ×
      </button>
      <p className="lightbox__hint">스크롤로 확대 · 드래그로 이동 · Esc로 닫기</p>
      <div
        ref={stageRef}
        className={`lightbox__stage${view.scale > 1 ? ' lightbox__stage--zoomed' : ''}`}
        onClick={(event) => event.stopPropagation()}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
      >
        <img
          src={src}
          alt={alt}
          decoding="sync"
          draggable={false}
          style={{
            transform: `translate(${view.x}px, ${view.y}px) scale(${view.scale})`,
          }}
        />
      </div>
    </div>
  );
}

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
          <DiagramLightbox src={imageSrc} alt={label} onClose={() => setOpen(false)} />
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
