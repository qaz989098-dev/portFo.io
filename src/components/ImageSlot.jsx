import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import architectureSvg from '../assets/diagrams/architecture.svg?raw';
import architectureRuntimeSvg from '../assets/diagrams/architecture-runtime.svg?raw';

const MIN_SCALE = 1;
const MAX_SCALE = 8;
const CLICK_ZOOM = 1.7;

const BUNDLED_SVG = {
  [`${import.meta.env.BASE_URL}assets/images/public-safety-map/architecture.svg`]: architectureSvg,
  [`${import.meta.env.BASE_URL}assets/images/public-safety-map/architecture-runtime.svg`]: architectureRuntimeSvg,
};

function isSvgSrc(src) {
  return /\.svg($|\?)/i.test(src);
}

function prepareSvg(text) {
  return text
    .replace(/<\?xml[\s\S]*?\?>/i, '')
    .replace(/<!DOCTYPE[\s\S]*?>/i, '')
    .trim();
}

function useSvgMarkup(src) {
  const bundled = BUNDLED_SVG[src] || BUNDLED_SVG[String(src).split('?')[0]];
  const prepared = bundled ? prepareSvg(bundled) : '';
  return isSvgSrc(src) ? prepared : '';
}

function clampScale(value) {
  return Math.min(MAX_SCALE, Math.max(MIN_SCALE, value));
}

function zoomAt(prev, clientX, clientY, stage, factor) {
  const rect = stage.getBoundingClientRect();
  const mx = clientX - rect.left;
  const my = clientY - rect.top;
  const nextScale = clampScale(prev.scale * factor);
  const ratio = nextScale / prev.scale;
  return {
    scale: nextScale,
    x: mx - (mx - prev.x) * ratio,
    y: my - (my - prev.y) * ratio,
  };
}

function DiagramLightbox({ src, alt, onClose }) {
  const stageRef = useRef(null);
  const graphicRef = useRef(null);
  const dragRef = useRef(null);
  const didDragRef = useRef(false);
  const centeredRef = useRef(false);
  const [view, setView] = useState({ scale: 1, x: 0, y: 0 });
  const svgMarkup = useSvgMarkup(src);
  const vector = Boolean(svgMarkup);

  useLayoutEffect(() => {
    const stage = stageRef.current;
    const graphic = graphicRef.current;
    if (!stage || !graphic) return undefined;

    const center = () => {
      if (centeredRef.current) return true;
      const gw = graphic.offsetWidth;
      const gh = graphic.offsetHeight;
      if (gw < 8 || gh < 8) return false;
      centeredRef.current = true;
      setView({
        scale: 1,
        x: (stage.clientWidth - gw) / 2,
        y: (stage.clientHeight - gh) / 2,
      });
      return true;
    };

    if (center()) return undefined;
    const frame = window.requestAnimationFrame(center);
    return () => window.cancelAnimationFrame(frame);
  }, [svgMarkup, vector]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
    };

    const handleWheel = (event) => {
      event.preventDefault();
      event.stopPropagation();
      const stage = stageRef.current;
      if (!stage || !centeredRef.current) return;

      let dy = event.deltaY;
      if (event.deltaMode === 1) dy *= 16;
      if (event.deltaMode === 2) dy *= stage.clientHeight;
      const factor = Math.exp(-dy * 0.0018);

      setView((prev) => zoomAt(prev, event.clientX, event.clientY, stage, factor));
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('wheel', handleWheel, { passive: false, capture: true });

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('wheel', handleWheel, { capture: true });
    };
  }, [onClose]);

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
    if (!stage || !graphic || !centeredRef.current) return;

    const box = graphic.getBoundingClientRect();
    const inside =
      event.clientX >= box.left &&
      event.clientX <= box.right &&
      event.clientY >= box.top &&
      event.clientY <= box.bottom;
    if (!inside) return;

    setView((prev) => zoomAt(prev, event.clientX, event.clientY, stage, CLICK_ZOOM));
  };

  const graphicStyle = {
    transform: `translate(${view.x}px, ${view.y}px) scale(${view.scale})`,
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
            className="lightbox__graphic"
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
