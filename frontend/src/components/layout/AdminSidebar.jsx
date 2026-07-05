import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

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
  const { logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate('/admin/login');
  }

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
      <button
        onClick={handleLogout}
        className="tmx-button tmx-button--danger"
        style={{
          width: '100%',
          marginTop: '1.25rem',
          minHeight: '42px',
          padding: '0.6rem 1rem',
          fontSize: '0.95rem'
        }}
      >
        Sign Out
      </button>
    </aside>
  );
}
