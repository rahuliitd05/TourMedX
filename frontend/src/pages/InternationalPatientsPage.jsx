import PageHeader from '../components/navigation/PageHeader';
import SectionTitle from '../components/ui/SectionTitle';
import Card from '../components/ui/Card';
import { internationalPatients } from '../data/siteContent';

export default function InternationalPatientsPage() {
  return (
    <div className="tmx-page">
      <PageHeader
        eyebrow="International Patients"
        title="Support services for patients traveling to Egypt"
        description="We coordinate every major part of the patient experience, from medical evaluation to follow-up."
      />
      <section className="tmx-section">
        <SectionTitle title="What we coordinate" />
        <div className="tmx-grid tmx-grid--4">
          {internationalPatients.map((item) => (
            <Card key={item} title={item} />
          ))}
        </div>
      </section>
    </div>
  );
}
