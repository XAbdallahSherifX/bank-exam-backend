import { config } from "dotenv";
import { resolve } from "path";
const envPath = resolve(`./config/.env.${process.env.NODE_ENV}`);
config({ path: envPath });
const DB_URI = process.env.DB_URI;
const PORT = process.env.PORT;

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const ACCESS_TOKEN_EXPIRATION_AFTER = process.env.ACCESS_TOKEN_EXPIRATION_AFTER;
const REDIS_URI = process.env.REDIS_URI;
export {
  DB_URI,
  PORT,
  ACCESS_TOKEN_EXPIRATION_AFTER,
  ACCESS_TOKEN_SECRET,
  REDIS_URI,
};
