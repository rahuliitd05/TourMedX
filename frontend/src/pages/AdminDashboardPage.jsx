import Card from '../components/ui/Card';
import SectionTitle from '../components/ui/SectionTitle';

const overviewCards = [
  {
    title: 'Doctors',
    description: 'Manage specialist profiles, photos, and qualifications.'
  },
  {
    title: 'Hospitals',
    description: 'Control hospital listings, logos, and image galleries.'
  },
  {
    title: 'Treatments',
    description: 'Update treatment page content and FAQs.'
  },
  {
    title: 'Packages',
    description: 'Edit medical tourism itineraries and pricing.'
  },
  {
    title: 'Messages',
    description: 'Review contact submissions and partnership requests.'
  },
  {
    title: 'Media',
    description: 'Organize uploaded images for the site and dashboard.'
  }
];

export default function AdminDashboardPage() {
  return (
    <div className="tmx-page">
      <SectionTitle
        eyebrow="Dashboard"
        title="TourMedX administration"
        description="Use the sidebar to move through each content module."
      />
      <div className="tmx-grid tmx-grid--3">
        {overviewCards.map((card) => (
          <Card
            key={card.title}
            title={card.title}
            description={card.description}
          />
        ))}
      </div>
    </div>
  );
}
