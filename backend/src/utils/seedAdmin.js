import Admin from '../models/Admin.js';

export async function seedDefaultAdmin() {
  const defaultEmail = (
    process.env.ADMIN_EMAIL || 'admin@tourmedx.com'
  ).toLowerCase();
  const defaultPassword = process.env.ADMIN_PASSWORD || 'Admin@1234!';
  const defaultName = process.env.ADMIN_NAME || 'TourMedX Admin';

  const existingAdmin = await Admin.findOne({ email: defaultEmail });

  if (existingAdmin) {
    return existingAdmin;
  }

  return Admin.create({
    name: defaultName,
    email: defaultEmail,
    password: defaultPassword,
    role: 'admin'
  });
}
