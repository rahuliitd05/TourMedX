import PageHeader from '../components/navigation/PageHeader';
import SectionTitle from '../components/ui/SectionTitle';
import Card from '../components/ui/Card';
import PartnerForm from '../components/forms/PartnerForm';
import { partnerFormTypes } from '../data/siteContent';

export default function BecomePartnerPage() {
  return (
    <div className="tmx-page">
      <PageHeader
        eyebrow="Become a Partner"
        title="Partner with TourMedX"
        description="Submit a doctor, hospital, or laboratory partnership request and we’ll review your profile."
      />
      <section className="tmx-section">
        <SectionTitle title="Choose a partnership type" />
        <div className="tmx-grid tmx-grid--3">
          {partnerFormTypes.map((partnerType) => (
            <Card
              key={partnerType.key}
              title={partnerType.label}
              description={partnerType.description}
            >
              <PartnerForm label={partnerType.label} />
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
