export default function SectionTitle({
  eyebrow,
  title,
  description,
  align = 'left'
}) {
  return (
    <div className={`tmx-section-title tmx-section-title--${align}`}>
      {eyebrow ? <p className="tmx-eyebrow">{eyebrow}</p> : null}
      <h2>{title}</h2>
      {description ? <p className="tmx-section-copy">{description}</p> : null}
    </div>
  );
}
