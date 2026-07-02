import { Link } from 'react-router-dom';
import PageHeader from '../components/navigation/PageHeader';
import SectionTitle from '../components/ui/SectionTitle';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Loader from '../components/ui/Loader';
import { useResource } from '../hooks/useResource';
import { tourismPackages } from '../data/siteContent';

export default function PackagesPage() {
  const { data, loading } = useResource('/packages', tourismPackages);

  return (
    <div className="tmx-page">
      <PageHeader
        eyebrow="Tourism Packages"
        title="Patient-focused travel and recovery packages"
        description="Packages are built to simplify travel, accommodation, and treatment logistics."
      />
      <section className="tmx-section">
        <SectionTitle title="Available packages" />
        {loading ? (
          <Loader />
        ) : (
          <div className="tmx-grid tmx-grid--2">
            {data.map((tourPackage) => (
              <Card
                key={tourPackage.packageName}
                title={tourPackage.packageName}
                description={tourPackage.duration}
              >
                <p>
                  <strong>Itinerary:</strong>{' '}
                  {tourPackage.itinerary.join(' • ')}
                </p>
                <p>
                  <strong>Included:</strong>{' '}
                  {tourPackage.includedServices.join(', ')}
                </p>
                <p>
                  <strong>Price:</strong> {tourPackage.price || 'On request'}
                </p>
                <Button as={Link} to="/contact" variant="secondary">
                  Book Package
                </Button>
              </Card>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
