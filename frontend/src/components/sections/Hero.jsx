import Button from '../ui/Button';

export default function Hero({
  title,
  subtitle,
  highlights = [],
  primaryAction,
  secondaryAction,
  media = []
}) {
  return (
    <section className="tmx-hero">
      <div className="tmx-hero__copy">
        <p className="tmx-eyebrow">World-class healthcare in Egypt</p>
        <h1>{title}</h1>
        <p className="tmx-hero__subtitle">{subtitle}</p>
        <div className="tmx-hero__actions">
          <Button
            as={primaryAction.as}
            to={primaryAction.to}
            href={primaryAction.href}
          >
            {primaryAction.label}
          </Button>
          <Button
            as={secondaryAction.as}
            to={secondaryAction.to}
            href={secondaryAction.href}
            variant="secondary"
          >
            {secondaryAction.label}
          </Button>
        </div>
        <ul className="tmx-hero__highlights">
          {highlights.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
      <div className="tmx-hero__visual">
        <div className="tmx-hero__image-stack">
          {media.map((image) => (
            <figure className="tmx-hero__image-card" key={image.alt}>
              <img src={image.src} alt={image.alt} />
              <figcaption>{image.caption}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
