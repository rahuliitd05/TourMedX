import PageHeader from '../components/navigation/PageHeader';
import SectionTitle from '../components/ui/SectionTitle';
import TestimonialCard from '../components/ui/TestimonialCard';
import Loader from '../components/ui/Loader';
import { useResource } from '../hooks/useResource';
import { testimonials } from '../data/siteContent';

export default function TestimonialsPage() {
  const { data: list, loading } = useResource('/testimonials', testimonials);

  return (
    <div className="tmx-page">
      <PageHeader
        eyebrow="Testimonials"
        title="Patient stories and care outcomes"
        description="Read about the coordination experience from people who traveled for treatment through TourMedX."
      />
      <section className="tmx-section">
        <SectionTitle title="Three recent testimonials" />
        {loading ? (
          <Loader />
        ) : (
          <div className="tmx-grid tmx-grid--3">
            {list.map((testimonial) => (
              <TestimonialCard key={testimonial.name} testimonial={testimonial} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
