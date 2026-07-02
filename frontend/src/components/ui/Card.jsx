export default function Card({ title, description, children, className = '' }) {
  return (
    <article className={`tmx-card ${className}`.trim()}>
      {title ? <h3>{title}</h3> : null}
      {description ? <p>{description}</p> : null}
      {children}
    </article>
  );
}
