import { Link } from 'react-router-dom';
import Hero from '../components/sections/Hero';
import SectionTitle from '../components/ui/SectionTitle';
import Card from '../components/ui/Card';
import Timeline from '../components/ui/Timeline';
import Accordion from '../components/ui/Accordion';
import TestimonialCard from '../components/ui/TestimonialCard';
import ContactForm from '../components/forms/ContactForm';
import Button from '../components/ui/Button';
import { useResource } from '../hooks/useResource';
import {
  heroHighlights,
  whyEgyptCards,
  aboutSummary,
  specialtyCards,
  journeySteps,
  chooseCards,
  testimonials,
  faqItems
} from '../data/siteContent';

const heroMedia = [
  {
    src: 'https://images.unsplash.com/photo-1579684453423-f84349ef60b0?auto=format&fit=crop&w=1200&q=80',
    alt: 'Medical professionals in a modern clinic',
    caption: 'Medical coordination and specialist care'
  },
  {
    src: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80',
    alt: 'Egypt skyline at dusk',
    caption: 'Care coordination rooted in Egypt'
  }
];

export default function HomePage() {
  const { data: testimonialsList } = useResource('/testimonials', testimonials);
  const { data: faqsList } = useResource('/faqs', faqItems);
  const { data: treatmentsList } = useResource('/treatments', specialtyCards.map(item => ({
    ...item,
    overview: item.summary
  })));

  return (
    <div className="tmx-page tmx-page--home">
      <Hero
        title="World-Class Healthcare in Egypt, Made Simple"
        subtitle="Access trusted medical care with Egypt’s leading doctors, surgeons, and healthcare facilities, all coordinated through one dedicated team."
        highlights={heroHighlights}
        media={heroMedia}
        primaryAction={{
          as: Link,
          to: '/contact',
          label: 'Book Free Consultation'
        }}
        secondaryAction={{
          as: 'a',
          href: 'https://wa.me/201234567890',
          label: 'Chat on WhatsApp'
        }}
      />

      <section className="tmx-section">
        <SectionTitle
          eyebrow="Why Egypt?"
          title="A healthcare destination built for confidence and comfort."
          description="We combine specialist care, modern facilities, and patient-focused logistics for a smoother treatment journey."
        />
        <div className="tmx-grid tmx-grid--5">
          {whyEgyptCards.map((card) => (
            <Card
              key={card.title}
              title={card.title}
              description={card.description}
            />
          ))}
        </div>
      </section>

      <section className="tmx-section tmx-section--split">
        <div>
          <SectionTitle
            eyebrow={aboutSummary.eyebrow}
            title={aboutSummary.title}
            description={aboutSummary.description}
          />
          <ul className="tmx-checklist">
            {aboutSummary.points.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
          <Button as={Link} to="/about">
            Learn More About TourMedX
          </Button>
        </div>
        <Card title="Our Focus Areas">
          <div className="tmx-pill-list">
            {treatmentsList.slice(0, 5).map((item) => (
              <span key={item.slug}>{item.title}</span>
            ))}
          </div>
        </Card>
      </section>

      <section className="tmx-section">
        <SectionTitle
          eyebrow="Services"
          title="Medical specialties we coordinate"
          description="Each specialty links to a dedicated treatment page with an overview, recovery guidance, procedure details, and FAQs."
        />
        <div className="tmx-grid tmx-grid--3">
          {treatmentsList.map((item) => (
            <Card key={item.slug} title={item.title} description={item.overview || item.summary}>
              <Button
                as={Link}
                to={`/treatments/${item.slug}`}
                variant="secondary"
              >
                View Specialty
              </Button>
            </Card>
          ))}
        </div>
      </section>

      <section className="tmx-section">
        <SectionTitle
          eyebrow="Medical Journey"
          title="A coordinated patient journey from first call to follow-up"
          description="Every stage is planned to keep communication clear and recovery smooth."
        />
        <Timeline steps={journeySteps} />
      </section>

      <section className="tmx-section">
        <SectionTitle
          eyebrow="Why choose TourMedX"
          title="Built for trust, convenience, and premium patient care"
          description="The platform is designed around the needs of international patients who want confidence at every stage."
        />
        <div className="tmx-grid tmx-grid--3">
          {chooseCards.map((item) => (
            <Card key={item} title={item} />
          ))}
        </div>
      </section>

      <section className="tmx-section">
        <SectionTitle
          eyebrow="Testimonials"
          title="What patients say about the experience"
        />
        <div className="tmx-grid tmx-grid--3">
          {testimonialsList.map((testimonial) => (
            <TestimonialCard key={testimonial.name} testimonial={testimonial} />
          ))}
        </div>
      </section>

      <section className="tmx-section tmx-section--split">
        <div>
          <SectionTitle
            eyebrow="FAQ"
            title="Common questions from international patients"
          />
          <Accordion items={faqsList} />
        </div>
        <Card
          title="Ready to plan your care?"
          description="Our team can help you understand treatment options, timing, and next steps."
        >
          <Button as={Link} to="/contact">
            Start Your Consultation
          </Button>
        </Card>
      </section>

      <section className="tmx-section tmx-section--accent">
        <SectionTitle
          eyebrow="Contact"
          title="Speak to the TourMedX care team"
          description="Submit your details and we’ll help coordinate the right specialist, hospital, and support plan."
        />
        <ContactForm submitLabel="Submit Request" />
      </section>

      <section
        className="tmx-section"
        style={{
          textAlign: 'center',
          padding: '4rem 1.5rem',
          background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
          borderTop: '1px solid rgba(0, 0, 0, 0.05)'
        }}
      >
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <p
            className="tmx-eyebrow"
            style={{ color: '#0d6efd', fontWeight: '600', letterSpacing: '0.1em' }}
          >
            Administration
          </p>
          <h2 style={{ fontSize: '1.75rem', color: '#212529', marginBottom: '0.75rem' }}>
            System Administrator Access
          </h2>
          <p style={{ color: '#6c757d', marginBottom: '1.5rem', fontSize: '1rem' }}>
            Manage doctors, hospitals, treatments, tourism packages, and user contact entries.
          </p>
          <Button as={Link} to="/admin" variant="secondary">
            Access Admin Console
          </Button>
        </div>
      </section>
    </div>
  );
}
