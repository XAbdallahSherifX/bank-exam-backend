import mongoose from "mongoose";
import { currencyEnum, accountStatusEnum } from "../../common/enums/index.js";

const accountSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: [true, "User ID is required"],
    },
    accountNumber: {
      type: String,
      required: [true, "Account number is required"],
      trim: true,
      minLength: [10, "Account number must be at least 10 characters"],
      maxLength: [20, "Account number must be at most 20 characters"],
    },
    balance: {
      type: Number,
      default: 0,
      min: [0, "Balance cannot be negative"],
    },
    currency: {
      type: String,
      enum: {
        values: Object.values(currencyEnum),
        message: `Currency must be one of: ${Object.values(currencyEnum).join(", ")}`,
      },
      default: currencyEnum.USD,
    },
    status: {
      type: String,
      enum: {
        values: Object.values(accountStatusEnum),
        message: `Status must be one of: ${Object.values(accountStatusEnum).join(", ")}`,
      },
      default: accountStatusEnum.Active,
    },
  },
  {
    collection: "Accounts",
    timestamps: true,
    autoIndex: true,
    strict: true,
    strictQuery: true,
    optimisticConcurrency: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

accountSchema.index({ userId: 1 });
accountSchema.index({ accountNumber: 1 });

export const Account =
  mongoose.models.Accounts || mongoose.model("Accounts", accountSchema);
