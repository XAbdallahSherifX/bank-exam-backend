import mongoose from "mongoose";
import { roleEnum } from "../../common/enums/index.js";
const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      minLength: [2, "Full name must be at least 2 character"],
      maxLength: [128, "Full name must be at most 128 characters"],
      required: [true, "Full name is required"],
      trim: true,
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: [
        function () {
          return this.provider === "system";
        },
        "Password is required for system accounts",
      ],
    },
    role: {
      type: String,
      enum: {
        values: Object.values(roleEnum),
        message: `Role must be one of: ${Object.values(roleEnum).join(", ")}`,
      },
      default: roleEnum.User,
    },
  },
  {
    collection: "Users",
    timestamps: true,
    autoIndex: true,
    strict: true,
    strictQuery: true,
    optimisticConcurrency: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);
export const User =
  mongoose.models.Users || mongoose.model("Users", userSchema);
