import PageHeader from '../components/navigation/PageHeader';
import SectionTitle from '../components/ui/SectionTitle';
import Accordion from '../components/ui/Accordion';
import Loader from '../components/ui/Loader';
import { useResource } from '../hooks/useResource';
import { faqItems } from '../data/siteContent';

export default function FaqPage() {
  const { data: list, loading } = useResource('/faqs', faqItems);

  return (
    <div className="tmx-page">
      <PageHeader
        eyebrow="FAQ"
        title="Frequently asked questions"
        description="Answers to the questions international patients typically ask before starting treatment planning."
      />
      <section className="tmx-section">
        <SectionTitle title="Help center" />
        {loading ? <Loader /> : <Accordion items={list} />}
      </section>
    </div>
  );
}
