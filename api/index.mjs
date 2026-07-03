import app from '../backend/src/app.js';
import { ensureRuntimeReady } from '../backend/src/config/runtime.js';

export default async function handler(request, response) {
  try {
    await ensureRuntimeReady();
    return app(request, response);
  } catch (error) {
    console.error('TourMedX API runtime setup failed:', error);
    return response.status(500).json({
      message:
        'Backend startup failed. Check MongoDB and Vercel environment variables.'
    });
  }
}