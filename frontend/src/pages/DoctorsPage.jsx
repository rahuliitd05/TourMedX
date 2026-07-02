import { Link } from 'react-router-dom';
import PageHeader from '../components/navigation/PageHeader';
import SectionTitle from '../components/ui/SectionTitle';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Loader from '../components/ui/Loader';
import { useResource } from '../hooks/useResource';
import { doctors } from '../data/siteContent';

export default function DoctorsPage() {
  const { data, loading } = useResource('/doctors', doctors);

  return (
    <div className="tmx-page">
      <PageHeader
        eyebrow="Doctors"
        title="Doctor directory"
        description="Browse specialist profiles, qualifications, certifications, and associated hospitals."
      />
      <section className="tmx-section">
        <SectionTitle title="Specialist network" />
        {loading ? (
          <Loader />
        ) : (
          <div className="tmx-grid tmx-grid--2">
            {data.map((doctor) => (
              <Card
                key={doctor.name}
                title={doctor.name}
                description={doctor.specialty}
              >
                <p>{doctor.qualifications}</p>
                <p>{doctor.certifications}</p>
                <p>{doctor.biography}</p>
                <p>
                  <strong>Experience:</strong> {doctor.experience}
                </p>
                <p>
                  <strong>Languages:</strong>{' '}
                  {Array.isArray(doctor.languages)
                    ? doctor.languages.join(', ')
                    : doctor.languages}
                </p>
                <Button as={Link} to="/contact" variant="secondary">
                  Book Consultation
                </Button>
              </Card>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
