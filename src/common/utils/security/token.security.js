import jwt from "jsonwebtoken";
import { internalServerErrorException } from "../response/index.js";
export const generateToken = ({
  payload = {},
  signature,
  expiresIn,
  options = {},
}) => {
  if (!Object.keys(payload).length) {
    throw internalServerErrorException("Token payload cannot be empty");
  }
  const tokenOptions = { expiresIn, ...options };
  try {
    const token = jwt.sign(payload, signature, tokenOptions);
    return token;
  } catch (error) {
    throw internalServerErrorException("Failed to generate token");
  }
};
export const verifyToken = ({ token, signature, options = {} }) => {
  try {
    const decoded = jwt.verify(token, signature, options);
    return decoded;
  } catch (error) {
    return { error: error.message };
  }
};
