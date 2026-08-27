import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import architectureSvg from '../assets/diagrams/architecture.svg?raw';
import architectureRuntimeSvg from '../assets/diagrams/architecture-runtime.svg?raw';

const MIN_SCALE = 1;
const MAX_SCALE = 8;
const DRAG_THRESHOLD = 6;

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
  return useMemo(() => {
    const bundled = BUNDLED_SVG[src] || BUNDLED_SVG[String(src).split('?')[0]];
    if (!bundled || !isSvgSrc(src)) return '';
    return prepareSvg(bundled);
  }, [src]);
}

function clampScale(value) {
  return Math.min(MAX_SCALE, Math.max(MIN_SCALE, value));
}

function fitView(stage, base) {
  return {
    scale: 1,
    x: (stage.clientWidth - base.w) / 2,
    y: (stage.clientHeight - base.h) / 2,
  };
}

function zoomAt(prev, clientX, clientY, stage, factor) {
  const rect = stage.getBoundingClientRect();
  const mx = clientX - rect.left;
  const my = clientY - rect.top;
  const nextScale = clampScale(prev.scale * factor);
  const ratio = nextScale / prev.scale;
  if (ratio === 1) return prev;
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
  const viewRef = useRef({ scale: 1, x: 0, y: 0 });
  const fittedRef = useRef(false);
  const [base, setBase] = useState({ w: 0, h: 0 });
  const [view, setView] = useState({ scale: 1, x: 0, y: 0 });
  const svgMarkup = useSvgMarkup(src);
  viewRef.current = view;

  useLayoutEffect(() => {
    const fit = () => {
      if (fittedRef.current) return true;
      const stage = stageRef.current;
      const svg = graphicRef.current?.querySelector('svg');
      if (!stage || !svg) return false;

      const vb = svg.viewBox.baseVal;
      const svgW = vb && vb.width ? vb.width : svg.width.baseVal.value || 1400;
      const svgH = vb && vb.height ? vb.height : svg.height.baseVal.value || 900;
      const maxW = stage.clientWidth * 0.92;
      const maxH = stage.clientHeight - 56;
      const next = Math.min(maxW / svgW, maxH / svgH);
      const w = svgW * next;
      const h = svgH * next;
      fittedRef.current = true;
      setBase({ w, h });
      setView(fitView(stage, { w, h }));
      return true;
    };

    if (fit()) return undefined;
    const frame = window.requestAnimationFrame(fit);
    return () => window.cancelAnimationFrame(frame);
  }, [svgMarkup]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
    };

    const handleWheel = (event) => {
      event.preventDefault();
      event.stopPropagation();
      const stage = stageRef.current;
      if (!stage || base.w < 8) return;

      let dy = event.deltaY;
      if (event.deltaMode === 1) dy *= 16;
      if (event.deltaMode === 2) dy *= stage.clientHeight;

      setView((prev) => zoomAt(prev, event.clientX, event.clientY, stage, Math.exp(-dy * 0.0018)));
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('wheel', handleWheel, { passive: false, capture: true });

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('wheel', handleWheel, { capture: true });
    };
  }, [onClose, base.w]);

  const handlePointerDown = (event) => {
    if (event.button !== 0) return;
    event.preventDefault();
    event.stopPropagation();
    dragRef.current = {
      pointerId: event.pointerId,
      x: event.clientX,
      y: event.clientY,
      originX: viewRef.current.x,
      originY: viewRef.current.y,
      moved: false,
    };
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event) => {
    const drag = dragRef.current;
    if (!drag) return;
    const dx = event.clientX - drag.x;
    const dy = event.clientY - drag.y;
    if (!drag.moved) {
      if (dx * dx + dy * dy < DRAG_THRESHOLD * DRAG_THRESHOLD) return;
      drag.moved = true;
    }
    setView((prev) => ({
      ...prev,
      x: drag.originX + dx,
      y: drag.originY + dy,
    }));
  };

  const handlePointerUp = (event) => {
    const drag = dragRef.current;
    if (drag && event.currentTarget.hasPointerCapture?.(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    dragRef.current = null;
    if (!drag || drag.moved) return;
    if (viewRef.current.scale <= 1) return;
    const stage = stageRef.current;
    if (!stage || base.w < 8) return;
    setView(fitView(stage, base));
  };

  return (
    <div
      className="lightbox"
      role="presentation"
      onClick={(event) => event.stopPropagation()}
      onMouseDown={(event) => event.stopPropagation()}
    >
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
        휠로 확대/축소 · 드래그로 이동 · 클릭하면 확대 해제 · Esc로 닫기 · {Math.round(view.scale * 100)}%
      </p>
      <div
        ref={stageRef}
        className={`lightbox__stage${view.scale > 1 ? ' lightbox__stage--zoomed' : ''}`}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={(event) => {
          if (event.currentTarget.hasPointerCapture?.(event.pointerId)) {
            event.currentTarget.releasePointerCapture(event.pointerId);
          }
          dragRef.current = null;
        }}
      >
        <div
          ref={graphicRef}
          className="lightbox__graphic"
          style={{
            left: `${view.x}px`,
            top: `${view.y}px`,
            width: base.w ? `${base.w * view.scale}px` : undefined,
          }}
          aria-label={alt}
          role="img"
        >
          <div
            className="lightbox__graphic-inner"
            dangerouslySetInnerHTML={{ __html: svgMarkup }}
          />
        </div>
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
