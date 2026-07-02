import { Outlet } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';

export default function AdminLayout() {
  return (
    <div className="tmx-admin-shell">
      <AdminSidebar />
      <section className="tmx-admin-shell__content">
        <Outlet />
      </section>
    </div>
  );
}
