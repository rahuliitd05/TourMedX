import PageHeader from '../components/navigation/PageHeader';
import SectionTitle from '../components/ui/SectionTitle';
import Accordion from '../components/ui/Accordion';
import { faqItems } from '../data/siteContent';

export default function FaqPage() {
  return (
    <div className="tmx-page">
      <PageHeader
        eyebrow="FAQ"
        title="Frequently asked questions"
        description="Answers to the questions international patients typically ask before starting treatment planning."
      />
      <section className="tmx-section">
        <SectionTitle title="Help center" />
        <Accordion items={faqItems} />
      </section>
    </div>
  );
}
