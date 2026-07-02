import { NavLink } from 'react-router-dom';

const adminLinks = [
  { label: 'Dashboard', to: '/admin' },
  { label: 'Doctors', to: '/admin/doctors' },
  { label: 'Hospitals', to: '/admin/hospitals' },
  { label: 'Treatments', to: '/admin/treatments' },
  { label: 'Packages', to: '/admin/packages' },
  { label: 'Testimonials', to: '/admin/testimonials' },
  { label: 'FAQs', to: '/admin/faqs' },
  { label: 'Contacts', to: '/admin/contacts' },
  { label: 'Partners', to: '/admin/partners' },
  { label: 'Media Gallery', to: '/admin/media' }
];

export default function AdminSidebar() {
  return (
    <aside className="tmx-admin-sidebar">
      <div>
        <p className="tmx-eyebrow">Admin Console</p>
        <h2>TourMedX</h2>
      </div>
      <nav>
        {adminLinks.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.to === '/admin'}
            className={({ isActive }) => (isActive ? 'is-active' : '')}
          >
            {link.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
