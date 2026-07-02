export function notFound(request, response, next) {
  const error = new Error(`Not found - ${request.originalUrl}`);
  response.status(404);
  next(error);
}

export function errorHandler(error, request, response, _next) {
  const statusCode = response.statusCode === 200 ? 500 : response.statusCode;
  response.status(statusCode).json({
    message: error.message,
    stack: process.env.NODE_ENV === 'production' ? undefined : error.stack
  });
}
