import mongoose from "mongoose";
import {
  transactionTypeEnum,
  transactionStatusEnum,
} from "../../common/enums/index.js";

const transactionSchema = new mongoose.Schema(
  {
    accountId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Accounts",
      required: [true, "Account ID is required"],
    },
    type: {
      type: String,
      enum: {
        values: Object.values(transactionTypeEnum),
        message: `Type must be one of: ${Object.values(transactionTypeEnum).join(", ")}`,
      },
      required: [true, "Transaction type is required"],
    },
    amount: {
      type: Number,
      required: [true, "Amount is required"],
      min: [0.01, "Amount must be greater than 0"],
    },
    balanceBefore: {
      type: Number,
      required: [true, "Balance before is required"],
      min: [0, "Balance before cannot be negative"],
    },
    balanceAfter: {
      type: Number,
      required: [true, "Balance after is required"],
      min: [0, "Balance after cannot be negative"],
    },
    status: {
      type: String,
      enum: {
        values: Object.values(transactionStatusEnum),
        message: `Status must be one of: ${Object.values(transactionStatusEnum).join(", ")}`,
      },
      default: transactionStatusEnum.Pending,
    },
  },
  {
    collection: "transactions",
    timestamps: true,
    autoIndex: true,
    strict: true,
    strictQuery: true,
    optimisticConcurrency: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

export const Transaction =
  mongoose.models.transactions ||
  mongoose.model("transactions", transactionSchema);
