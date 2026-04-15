import { badRequestException } from "../common/utils/index.js";
export const validationMiddleware = (schema) => {
  return (req, res, next) => {
    try {
      const validationErrors = [];
      const dataSources = ["body", "query", "params", "headers"];
      dataSources.forEach((key) => {
        if (schema[key]) {
          const { error } = schema[key].validate(req[key], {
            abortEarly: false,
          });

          if (error) {
            const details = error.details.map((err) => err.message);
            validationErrors.push(...details);
          }
        }
      });

      if (validationErrors.length > 0) {
        throw badRequestException(validationErrors.join(", "));
      }
      next();
    } catch (error) {
      next(error);
    }
  };
};
