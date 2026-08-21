export default function ImageSlot({
  projectId,
  slot,
  caption,
  variant = 'gallery',
  imageSrc = null,
}) {
  const label = caption || '스크린샷 (추가 예정)';

  if (imageSrc) {
    return (
      <figure className={`image-slot image-slot--${variant}`} data-slot={slot}>
        <img src={imageSrc} alt={label} loading="lazy" />
        {caption && <figcaption>{caption}</figcaption>}
      </figure>
    );
  }

  return (
    <figure className={`image-slot image-slot--${variant} image-slot--placeholder`} data-slot={slot}>
      <div className="image-slot__placeholder" aria-hidden="true">
        <span className="image-slot__initial">{projectId.slice(0, 2).toUpperCase()}</span>
        <span className="image-slot__hint">이미지 추가 예정</span>
      </div>
      <figcaption>{label}</figcaption>
    </figure>
  );
}
