import { forbiddenException } from "../common/utils/index.js";
export const authorize = (allowedRoles = []) => {
  return (req, res, next) => {
    try {
      if (!req.user) {
        throw new Error(
          "authorize middleware called without authenticate middleware",
        );
      }
      if (!allowedRoles.includes(req.user.role)) {
        throw forbiddenException(
          "You do not have permission to perform this action",
        );
      }
      next();
    } catch (error) {
      next(error);
    }
  };
};
