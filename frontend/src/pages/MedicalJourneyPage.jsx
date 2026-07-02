import { Link } from 'react-router-dom';
import PageHeader from '../components/navigation/PageHeader';
import SectionTitle from '../components/ui/SectionTitle';
import Timeline from '../components/ui/Timeline';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { journeySteps } from '../data/siteContent';

export default function MedicalJourneyPage() {
  return (
    <div className="tmx-page">
      <PageHeader
        eyebrow="Medical Journey"
        title="Your coordinated care pathway"
        description="From free consultation to follow-up care, every step is designed to reduce uncertainty and improve comfort."
      />
      <section className="tmx-section">
        <SectionTitle title="Five-stage journey" />
        <Timeline steps={journeySteps} />
      </section>
      <section className="tmx-section tmx-section--accent">
        <Card
          title="Start the journey"
          description="Tell us what you need and we’ll help coordinate the next step."
        >
          <Button as={Link} to="/contact">
            Contact TourMedX
          </Button>
        </Card>
      </section>
    </div>
  );
}
