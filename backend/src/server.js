import dotenv from 'dotenv';
import app from './app.js';
import { connectDatabase } from './config/db.js';
import { seedDefaultAdmin } from './utils/seedAdmin.js';

dotenv.config();

const port = process.env.PORT || 5000;

async function startServer() {
  await connectDatabase();
  await seedDefaultAdmin();

  app.listen(port, () => {
    console.log(`TourMedX API running on port ${port}`);
  });
}

startServer().catch((error) => {
  console.error(error);
  process.exit(1);
});
