import { NavLink } from 'react-router-dom';
import { navigationLinks } from '../../data/siteContent';
import Button from '../ui/Button';

export default function Navbar() {
  return (
    <header className="tmx-navbar">
      <div className="tmx-navbar__brand">
        <span className="tmx-logo">TourMedX</span>
        <span>Premium Medical Tourism in Egypt</span>
      </div>
      <nav className="tmx-navbar__links">
        {navigationLinks.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) => (isActive ? 'is-active' : '')}
          >
            {link.label}
          </NavLink>
        ))}
      </nav>
      <div className="tmx-navbar__actions">
        <Button as={NavLink} to="/contact">
          Book Free Consultation
        </Button>
      </div>
    </header>
  );
}
