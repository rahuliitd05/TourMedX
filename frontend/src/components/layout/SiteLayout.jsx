import { Outlet } from 'react-router-dom';
import Navbar from '../navigation/Navbar';
import Footer from '../navigation/Footer';

export default function SiteLayout() {
  return (
    <div className="tmx-shell">
      <Navbar />
      <main className="tmx-shell__content">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
