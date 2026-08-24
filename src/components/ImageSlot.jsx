export default function ImageSlot({
  slot,
  caption,
  variant = 'gallery',
  imageSrc = null,
}) {
  const label = caption || '예시 사진 (추가 예정)';
  const showCaption = variant !== 'thumb';

  if (imageSrc) {
    return (
      <figure className={`image-slot image-slot--${variant}`} data-slot={slot}>
        <img src={imageSrc} alt={label} loading="lazy" />
        {showCaption && caption ? <figcaption>{caption}</figcaption> : null}
      </figure>
    );
  }

  return (
    <figure className={`image-slot image-slot--${variant} image-slot--placeholder`} data-slot={slot}>
      <div className="image-slot__placeholder" aria-hidden="true">
        <span className="image-slot__hint">예시 사진</span>
        <span className="image-slot__subhint">추가 예정</span>
      </div>
      {showCaption ? <figcaption>{label}</figcaption> : null}
    </figure>
  );
}
