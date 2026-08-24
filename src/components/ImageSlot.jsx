export default function ImageSlot({
  projectId,
  slot,
  caption,
  variant = 'gallery',
  imageSrc = null,
}) {
  const label = caption || '스크린샷 (추가 예정)';
  const initial = (projectId || 'PF').slice(0, 2).toUpperCase();

  if (imageSrc) {
    return (
      <figure className={`image-slot image-slot--${variant}`} data-slot={slot}>
        <img src={imageSrc} alt={label} loading="lazy" />
        {variant !== 'thumb' && caption ? <figcaption>{caption}</figcaption> : null}
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
