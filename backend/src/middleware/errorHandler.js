export function notFound(request, response, next) {
  const error = new Error(`Not found - ${request.originalUrl}`);
  response.status(404);
  next(error);
}

export function errorHandler(error, request, response, _next) {
  // Mongoose validation error → 400
  if (error.name === 'ValidationError') {
    const message = Object.values(error.errors)
      .map((e) => e.message)
      .join(', ');
    return response.status(400).json({ message });
  }

  // MongoDB duplicate key error → 409
  if (error.code === 11000) {
    const field = Object.keys(error.keyPattern || {})[0] || 'field';
    return response
      .status(409)
      .json({ message: `A record with this ${field} already exists.` });
  }

  const statusCode =
    error.statusCode || (response.statusCode === 200 ? 500 : response.statusCode);
  response.status(statusCode).json({
    message: error.message,
    stack: process.env.NODE_ENV === 'production' ? undefined : error.stack
  });
}
