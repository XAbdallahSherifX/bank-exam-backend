import mongoose from "mongoose";
import { DB_URI } from "../../config/config.service.js";
import { User } from "./models/index.js";
export async function connectDB() {
  try {
    await mongoose.connect(DB_URI, { serverSelectionTimeoutMS: 30000 });
    console.log("Database is Connected Successfully 👌");
    await User.syncIndexes();
  } catch (error) {
    console.log("Failed to connect to database ❌");
    console.log(error);
  }
}
