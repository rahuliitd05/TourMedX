import { useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import PageHeader from '../components/navigation/PageHeader';
import SectionTitle from '../components/ui/SectionTitle';
import Card from '../components/ui/Card';
import Accordion from '../components/ui/Accordion';
import Button from '../components/ui/Button';
import { treatmentDetails } from '../data/siteContent';

export default function TreatmentDetailPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const treatment = treatmentDetails[slug];

  useEffect(() => {
    if (!treatment) {
      navigate('/treatments', { replace: true });
    }
  }, [navigate, treatment]);

  if (!treatment) {
    return null;
  }

  return (
    <div className="tmx-page">
      <PageHeader
        eyebrow="Treatment Overview"
        title={treatment.title}
        description="Each specialty page includes overview, benefits, recovery guidance, procedure details, FAQ support, and a consultation CTA."
      />

      <section className="tmx-section tmx-section--split">
        <Card title="Overview" description={treatment.overview} />
        <Card title="Recovery" description={treatment.recovery} />
      </section>

      <section className="tmx-section">
        <SectionTitle title="Benefits" />
        <div className="tmx-grid tmx-grid--4">
          {treatment.benefits.map((benefit) => (
            <Card key={benefit} title={benefit} />
          ))}
        </div>
      </section>

      <section className="tmx-section tmx-section--split">
        <Card title="Procedure" description={treatment.procedure} />
        <Card title="Consultation CTA">
          <Button as={Link} to="/contact">
            Book a Consultation
          </Button>
        </Card>
      </section>

      <section className="tmx-section">
        <SectionTitle title="FAQ" />
        <Accordion items={treatment.faqs} />
      </section>
    </div>
  );
}
