import { Link } from 'react-router-dom';
import PageHeader from '../components/navigation/PageHeader';
import SectionTitle from '../components/ui/SectionTitle';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Loader from '../components/ui/Loader';
import { useResource } from '../hooks/useResource';
import { hospitals } from '../data/siteContent';

export default function HospitalsPage() {
  const { data, loading } = useResource('/hospitals', hospitals);

  return (
    <div className="tmx-page">
      <PageHeader
        eyebrow="Hospitals & Laboratories"
        title="Hospital and facility directory"
        description="Explore trusted hospital partners, departments, facilities, and galleries."
      />
      <section className="tmx-section">
        <SectionTitle title="Facilities" />
        {loading ? (
          <Loader />
        ) : (
          <div className="tmx-grid tmx-grid--2">
            {data.map((hospital) => (
              <Card
                key={hospital.name}
                title={hospital.name}
                description={hospital.location}
              >
                <p>{hospital.about}</p>
                <p>
                  <strong>Departments:</strong>{' '}
                  {hospital.departments.join(', ')}
                </p>
                <p>
                  <strong>Services:</strong> {hospital.services.join(', ')}
                </p>
                <p>
                  <strong>Facilities:</strong> {hospital.facilities.join(', ')}
                </p>
                <Button as={Link} to="/contact" variant="secondary">
                  Request Coordination
                </Button>
              </Card>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
