import { Route, Routes } from 'react-router-dom';
import SiteLayout from './components/layout/SiteLayout';
import AdminLayout from './components/layout/AdminLayout';
import ProtectedRoute from './components/layout/ProtectedRoute';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import TreatmentsPage from './pages/TreatmentsPage';
import TreatmentDetailPage from './pages/TreatmentDetailPage';
import DoctorsPage from './pages/DoctorsPage';
import HospitalsPage from './pages/HospitalsPage';
import PackagesPage from './pages/PackagesPage';
import MedicalJourneyPage from './pages/MedicalJourneyPage';
import InternationalPatientsPage from './pages/InternationalPatientsPage';
import TestimonialsPage from './pages/TestimonialsPage';
import FaqPage from './pages/FaqPage';
import ContactPage from './pages/ContactPage';
import BecomePartnerPage from './pages/BecomePartnerPage';
import PolicyPage from './pages/PolicyPage';
import AdminLoginPage from './pages/AdminLoginPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import AdminModulePage from './pages/AdminModulePage';
import NotFoundPage from './pages/NotFoundPage';

export default function App() {
  return (
    <Routes>
      <Route element={<SiteLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/treatments" element={<TreatmentsPage />} />
        <Route path="/treatments/:slug" element={<TreatmentDetailPage />} />
        <Route path="/doctors" element={<DoctorsPage />} />
        <Route path="/hospitals" element={<HospitalsPage />} />
        <Route path="/packages" element={<PackagesPage />} />
        <Route path="/medical-journey" element={<MedicalJourneyPage />} />
        <Route
          path="/international-patients"
          element={<InternationalPatientsPage />}
        />
        <Route path="/testimonials" element={<TestimonialsPage />} />
        <Route path="/faq" element={<FaqPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/become-a-partner" element={<BecomePartnerPage />} />
        <Route
          path="/privacy-policy"
          element={<PolicyPage policyKey="privacy" />}
        />
        <Route
          path="/terms-and-conditions"
          element={<PolicyPage policyKey="terms" />}
        />
        <Route
          path="/refund-and-cancellation-policy"
          element={<PolicyPage policyKey="refund" />}
        />
      </Route>

      <Route path="/admin/login" element={<AdminLoginPage />} />
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<AdminDashboardPage />} />
        <Route path=":module" element={<AdminModulePage />} />
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
