import PageHeader from '../components/navigation/PageHeader';
import SectionTitle from '../components/ui/SectionTitle';
import ContactForm from '../components/forms/ContactForm';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

export default function ContactPage() {
  return (
    <div className="tmx-page">
      <PageHeader
        eyebrow="Contact"
        title="Talk to the TourMedX team"
        description="Share your details and treatment goals so we can help you move forward quickly and clearly."
      />
      <section className="tmx-section tmx-section--split">
        <div>
          <SectionTitle title="Send a request" />
          <ContactForm submitLabel="Submit" />
        </div>
        <Card
          title="WhatsApp support"
          description="Prefer a faster conversation? Reach out on WhatsApp for immediate support."
        >
          <Button as="a" href="https://wa.me/201234567890" variant="secondary">
            Chat on WhatsApp
          </Button>
        </Card>
      </section>
    </div>
  );
}
