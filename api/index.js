let runtimeReadyPromise;

async function loadBackend() {
  const [{ default: app }, { ensureRuntimeReady }] = await Promise.all([
    import('../backend/src/app.js'),
    import('../backend/src/config/runtime.js')
  ]);

  if (!runtimeReadyPromise) {
    runtimeReadyPromise = ensureRuntimeReady();
  }

  await runtimeReadyPromise;

  return app;
}

module.exports = async function handler(request, response) {
  try {
    const app = await loadBackend();
    return app(request, response);
  } catch (error) {
    console.error('TourMedX API runtime setup failed:', error);
    return response.status(500).json({
      message:
        'Backend startup failed. Check MongoDB and Vercel environment variables.'
    });
  }
};
