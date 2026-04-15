import { hash, verify } from "argon2";
import { internalServerErrorException } from "../response/error.response.js";
export async function generateHash(plainText) {
  try {
    const hashedPassword = await hash(plainText);
    return hashedPassword;
  } catch (error) {
    throw internalServerErrorException("Error hashing password");
  }
}
export async function compare(hashedPassword, plainText) {
  try {
    if (await verify(hashedPassword, plainText)) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    throw internalServerErrorException("Error comparing passwords");
  }
}
