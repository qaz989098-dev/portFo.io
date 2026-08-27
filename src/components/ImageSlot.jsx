import { useEffect, useLayoutEffect, useRef, useState } from 'react';

const MIN_SCALE = 1;
const MAX_SCALE = 8;
const CLICK_ZOOM = 1.7;
const svgCache = new Map();

function isSvgSrc(src) {
  return /\.svg($|\?)/i.test(src);
}

function prepareSvg(text) {
  return text
    .replace(/<\?xml[\s\S]*?\?>/i, '')
    .replace(/<!DOCTYPE[\s\S]*?>/i, '')
    .replace(/<svg\b([^>]*)>/i, (_, attrs) => {
      const cleaned = String(attrs)
        .replace(/\swidth="[^"]*"/i, '')
        .replace(/\sheight="[^"]*"/i, '');
      return `<svg${cleaned}>`;
    })
    .trim();
}

function useSvgMarkup(src) {
  const [markup, setMarkup] = useState(() => svgCache.get(src) || '');

  useEffect(() => {
    if (!isSvgSrc(src)) return undefined;
    if (svgCache.has(src)) {
      setMarkup(svgCache.get(src));
      return undefined;
    }

    let cancelled = false;
    fetch(src)
      .then((response) => response.text())
      .then((text) => {
        const prepared = prepareSvg(text);
        svgCache.set(src, prepared);
        if (!cancelled) setMarkup(prepared);
      })
      .catch(() => {
        if (!cancelled) setMarkup('');
      });

    return () => {
      cancelled = true;
    };
  }, [src]);

  return isSvgSrc(src) ? markup : '';
}

function zoomAround(prev, clientX, clientY, stage, factor) {
  const rect = stage.getBoundingClientRect();
  const cx = clientX - rect.left - rect.width / 2;
  const cy = clientY - rect.top - rect.height / 2;
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
}

function DiagramLightbox({ src, alt, onClose }) {
  const stageRef = useRef(null);
  const graphicRef = useRef(null);
  const dragRef = useRef(null);
  const didDragRef = useRef(false);
  const fitWidthRef = useRef(0);
  const [view, setView] = useState({ scale: 1, x: 0, y: 0 });
  const [fitWidth, setFitWidth] = useState(0);
  const svgMarkup = useSvgMarkup(src);
  const vector = Boolean(svgMarkup);
  fitWidthRef.current = fitWidth;

  useLayoutEffect(() => {
    if (!vector || view.scale !== 1 || !graphicRef.current) return;
    const width = graphicRef.current.getBoundingClientRect().width;
    if (width > 0) setFitWidth(width);
  }, [svgMarkup, vector, view.scale]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
    };

    const handleWheel = (event) => {
      event.preventDefault();
      event.stopPropagation();
      const stage = stageRef.current;
      if (!stage) return;
      if (vector && !fitWidthRef.current) return;

      let dy = event.deltaY;
      if (event.deltaMode === 1) dy *= 40;
      if (event.deltaMode === 2) dy *= 800;
      const factor = Math.exp(-dy * 0.0025);

      setView((prev) => zoomAround(prev, event.clientX, event.clientY, stage, factor));
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('wheel', handleWheel, { passive: false, capture: true });

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('wheel', handleWheel, { capture: true });
    };
  }, [onClose, vector]);

  const handlePointerDown = (event) => {
    if (event.button !== 0) return;
    event.preventDefault();
    event.stopPropagation();
    didDragRef.current = false;
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
    const dx = event.clientX - dragRef.current.x;
    const dy = event.clientY - dragRef.current.y;
    if (Math.abs(dx) > 3 || Math.abs(dy) > 3) {
      didDragRef.current = true;
    }
    setView((prev) => ({
      ...prev,
      x: dragRef.current.originX + dx,
      y: dragRef.current.originY + dy,
    }));
  };

  const handlePointerUp = (event) => {
    const dragged = didDragRef.current;
    dragRef.current = null;
    if (dragged) return;

    const stage = stageRef.current;
    const graphic = graphicRef.current;
    if (!stage || !graphic) return;

    const box = graphic.getBoundingClientRect();
    const inside =
      event.clientX >= box.left &&
      event.clientX <= box.right &&
      event.clientY >= box.top &&
      event.clientY <= box.bottom;
    if (!inside) return;

    setView((prev) => zoomAround(prev, event.clientX, event.clientY, stage, CLICK_ZOOM));
  };

  const graphicStyle = {
    width: fitWidth && view.scale !== 1 ? `${fitWidth * view.scale}px` : undefined,
    maxWidth: view.scale > 1 ? 'none' : undefined,
    maxHeight: view.scale > 1 ? 'none' : undefined,
    transform: `translate(${view.x}px, ${view.y}px)`,
  };

  return (
    <div className="lightbox" role="presentation">
      <button
        type="button"
        className="lightbox__close"
        aria-label="닫기"
        onClick={(event) => {
          event.stopPropagation();
          onClose();
        }}
      >
        ×
      </button>
      <p className="lightbox__hint">
        클릭한 위치를 확대 · 드래그로 이동 · 휠로 확대/축소 · Esc로 닫기 · {Math.round(view.scale * 100)}%
      </p>
      <div
        ref={stageRef}
        className={`lightbox__stage${view.scale > 1 ? ' lightbox__stage--zoomed' : ''}`}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={() => {
          dragRef.current = null;
        }}
      >
        {vector ? (
          <div
            ref={graphicRef}
            className={`lightbox__graphic${view.scale > 1 ? ' lightbox__graphic--zoomed' : ''}`}
            style={graphicStyle}
            aria-label={alt}
            role="img"
            dangerouslySetInnerHTML={{ __html: svgMarkup }}
          />
        ) : (
          <img
            ref={graphicRef}
            src={src}
            alt={alt}
            decoding="sync"
            draggable={false}
            style={graphicStyle}
          />
        )}
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
  const svgMarkup = useSvgMarkup(imageSrc || '');
  const label = caption || '스크린샷 (추가 예정)';
  const initial = (projectId || 'PF').slice(0, 2).toUpperCase();
  const canZoom = Boolean(imageSrc && (zoomable || variant === 'diagram'));
  const showVector = Boolean(canZoom && svgMarkup);

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
            {showVector ? (
              <span
                className="image-slot__vector"
                aria-hidden="true"
                dangerouslySetInnerHTML={{ __html: svgMarkup }}
              />
            ) : (
              <img src={imageSrc} alt={label} />
            )}
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
