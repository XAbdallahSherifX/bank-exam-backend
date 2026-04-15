import { verifyToken, unauthorizedException } from "../common/utils/index.js";
import { findOne, User } from "../DB/index.js";
import { ACCESS_TOKEN_SECRET } from "../../config/config.service.js";
import { GET } from "../common/services/index.js";

export const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw unauthorizedException(
        "Authentication token is missing or invalid format",
      );
    }
    const token = authHeader.split(" ")[1];

    const decoded = verifyToken({ token, signature: ACCESS_TOKEN_SECRET });
    if (decoded.error) {
      throw unauthorizedException(
        `Token is invalid or expired: ${decoded.error}`,
      );
    }

    const tokenInRedis = await GET({
      key: `user_tokens:${decoded.userId}:${token}`,
    });
    if (!tokenInRedis) {
      throw unauthorizedException(
        "Token has been invalidated or expired in store",
      );
    }

    const user = await findOne({
      filter: { _id: decoded.userId },
      model: User,
    });
    if (!user) {
      throw unauthorizedException(
        "The user belonging to this token no longer exists",
      );
    }
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};
