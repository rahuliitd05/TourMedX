import { connectDatabase } from './db.js';
import { seedDefaultAdmin } from '../utils/seedAdmin.js';

let runtimeReadyPromise;

export function ensureRuntimeReady() {
  if (!runtimeReadyPromise) {
    runtimeReadyPromise = (async () => {
      await connectDatabase();
      await seedDefaultAdmin();
    })().catch((error) => {
      runtimeReadyPromise = undefined;
      throw error;
    });
  }

  return runtimeReadyPromise;
}
