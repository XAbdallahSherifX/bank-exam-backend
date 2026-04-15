export const successResponse = ({
  res,
  message = "success",
  data,
  statusCode = 200,
}) => {
  return res.status(statusCode).json({
    message,
    statusCode,
    success: true,
    ...(data !== undefined && { data }),
  });
};
