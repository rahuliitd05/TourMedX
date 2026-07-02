import { Link } from 'react-router-dom';
import PageHeader from '../components/navigation/PageHeader';
import SectionTitle from '../components/ui/SectionTitle';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { companyStory, aboutSummary } from '../data/siteContent';

export default function AboutPage() {
  return (
    <div className="tmx-page">
      <PageHeader
        eyebrow="About Us"
        title="A premium medical tourism company built around clarity and care"
        description="TourMedX connects patients with trusted healthcare providers across Egypt while managing the details that make treatment travel easier."
      />
      <section className="tmx-section tmx-section--split">
        <Card title="Mission" description={companyStory.mission} />
        <Card title="Vision" description={companyStory.vision} />
      </section>
      <section className="tmx-section">
        <SectionTitle
          eyebrow="Company Story"
          title="Why TourMedX exists"
          description={companyStory.story}
        />
        <div className="tmx-grid tmx-grid--3">
          {companyStory.values.map((value) => (
            <Card key={value} title={value} />
          ))}
        </div>
      </section>
      <section className="tmx-section tmx-section--accent">
        <SectionTitle
          title={aboutSummary.title}
          description={aboutSummary.description}
        />
        <Button as={Link} to="/contact">
          Book Free Consultation
        </Button>
      </section>
    </div>
  );
}
