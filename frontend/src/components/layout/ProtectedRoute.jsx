import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function ProtectedRoute({ children }) {
  const location = useLocation();
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div
        className="tmx-admin-shell"
        style={{
          display: 'grid',
          placeItems: 'center',
          height: '60vh',
          margin: '2rem auto'
        }}
      >
        <div className="tmx-loader">
          <div className="tmx-loader__ring"></div>
          <span>Verifying credentials...</span>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  return children;
}
