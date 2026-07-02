import PageHeader from '../components/navigation/PageHeader';
import Card from '../components/ui/Card';
import { legalPages } from '../data/siteContent';

export default function PolicyPage({ policyKey }) {
  const policy = legalPages[policyKey];

  return (
    <div className="tmx-page">
      <PageHeader
        eyebrow="Legal"
        title={policy.title}
        description={policy.summary}
      />
      <section className="tmx-section">
        <Card title={policy.title} description={policy.summary} />
      </section>
    </div>
  );
}
