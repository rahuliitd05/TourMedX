import app from '../backend/src/app.js';
import { ensureRuntimeReady } from '../backend/src/config/runtime.js';

export default async function handler(request, response) {
  await ensureRuntimeReady();
  return app(request, response);
}
