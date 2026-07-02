import { useParams } from 'react-router-dom';
import AdminResourceManager from '../components/layout/AdminResourceManager';
import { adminModuleConfigs } from '../data/adminModules';

export default function AdminModulePage() {
  const { module } = useParams();
  const config = adminModuleConfigs[module];

  if (!config) {
    return <p>Module not found.</p>;
  }

  return <AdminResourceManager {...config} />;
}
