export default function Timeline({ steps = [] }) {
  return (
    <div className="tmx-timeline">
      {steps.map((step) => (
        <article className="tmx-timeline__step" key={step.title}>
          <span className="tmx-timeline__marker">{step.step}</span>
          <div>
            <h3>{step.title}</h3>
            <p>{step.description}</p>
          </div>
        </article>
      ))}
    </div>
  );
}
