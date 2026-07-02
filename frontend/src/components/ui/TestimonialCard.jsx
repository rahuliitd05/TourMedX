export default function TestimonialCard({ testimonial }) {
  return (
    <article className="tmx-card tmx-testimonial">
      <p className="tmx-testimonial__quote">“{testimonial.quote}”</p>
      <div>
        <h3>{testimonial.name}</h3>
        <p>{testimonial.location}</p>
      </div>
    </article>
  );
}
