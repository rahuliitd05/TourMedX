export default function PageHeader({ eyebrow, title, description }) {
  return (
    <section className="tmx-page-header">
      {eyebrow ? <p className="tmx-eyebrow">{eyebrow}</p> : null}
      <h1>{title}</h1>
      {description ? <p>{description}</p> : null}
    </section>
  );
}
