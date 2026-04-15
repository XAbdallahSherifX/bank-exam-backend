import Joi from "joi";
import { globalSchema } from "../../common/utils/index.js";

export const transactionActionSchema = {
  body: Joi.object({
    amount: globalSchema.amount.required(),
  }).required(),
};

export const getTransactionsSchema = {
  query: Joi.object({
    page: Joi.number().integer().min(1).default(1),
    limit: Joi.number().integer().min(1).max(100).default(10),
    type: globalSchema.transactionType,
    sortBy: Joi.string().valid("amount", "createdAt").default("createdAt"),
    sortOrder: Joi.string().valid("asc", "desc").default("desc"),
  }).required(),
};

export const getTransactionByIdSchema = {
  params: Joi.object({
    id: globalSchema.id.required(),
  }).required(),
};
