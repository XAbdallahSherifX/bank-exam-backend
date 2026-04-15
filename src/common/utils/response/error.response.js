export const globalErrorHandler = (err, req, res, next) => {
  const statusCode = err.cause?.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    status: "error",
    message,
    errorStack: err.stack,
  });
};
export const errorException = (message, statusCode = 500) => {
  throw new Error(message, { cause: { statusCode } });
};
export const conflictException = (message) => {
  errorException(message, 409);
};
export const badRequestException = (message) => {
  errorException(message, 400);
};
export const notFoundException = (message) => {
  errorException(message, 404);
};
export const unauthorizedException = (message) => {
  errorException(message, 401);
};
export const forbiddenException = (message) => {
  errorException(message, 403);
};
export const internalServerErrorException = (message) => {
  errorException(message, 500);
};
