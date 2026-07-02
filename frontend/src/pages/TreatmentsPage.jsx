import { Link } from 'react-router-dom';
import PageHeader from '../components/navigation/PageHeader';
import SectionTitle from '../components/ui/SectionTitle';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { specialtyCards } from '../data/siteContent';

export default function TreatmentsPage() {
  return (
    <div className="tmx-page">
      <PageHeader
        eyebrow="Treatments"
        title="Specialty treatment pathways"
        description="Browse the medical specialties we coordinate and open a dedicated page for each treatment category."
      />
      <section className="tmx-section">
        <SectionTitle title="Available specialties" />
        <div className="tmx-grid tmx-grid--3">
          {specialtyCards.map((item) => (
            <Card key={item.slug} title={item.title} description={item.summary}>
              <Button
                as={Link}
                to={`/treatments/${item.slug}`}
                variant="secondary"
              >
                Open Page
              </Button>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
