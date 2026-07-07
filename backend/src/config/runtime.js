import { connectDatabase } from './db.js';
import { seedDefaultAdmin } from '../utils/seedAdmin.js';
import { seedMockData } from '../utils/seedData.js';

let runtimeReadyPromise;

export function ensureRuntimeReady() {
  if (!runtimeReadyPromise) {
    runtimeReadyPromise = (async () => {
      await connectDatabase();
      await seedDefaultAdmin();
      await seedMockData();
    })().catch((error) => {
      runtimeReadyPromise = undefined;
      throw error;
    });
  }

  return runtimeReadyPromise;
}
