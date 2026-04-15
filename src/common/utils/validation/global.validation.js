import joi from "joi";
import { Types } from "mongoose";
import {
  roleEnum,
  currencyEnum,
  accountStatusEnum,
  transactionTypeEnum,
  transactionStatusEnum,
} from "../../enums/index.js";

export const validateObjectId = (value, helper) => {
  return Types.ObjectId.isValid(value)
    ? true
    : helper.message("Invalid MongoDB ObjectId");
};

export const globalSchema = {
  id: joi.string().custom(validateObjectId),
  firstName: joi.string().min(2).max(128).trim(),
  lastName: joi.string().min(2).max(128).trim(),
  email: joi.string().email({ tlds: { allow: true } }),
  password: joi.string().pattern(new RegExp(/^.{8,128}$/)),
  phone: joi.string().pattern(new RegExp(/^(\+2|2)?01[0125]{1}[0-9]{8}$/)),
  role: joi.string().valid(...Object.values(roleEnum)),
  accountNumber: joi.string().min(10).max(20).trim(),
  balance: joi.number().min(0),
  balanceBefore: joi.number().min(0),
  balanceAfter: joi.number().min(0),
  currency: joi.string().valid(...Object.values(currencyEnum)),
  status: joi.string().valid(...Object.values(accountStatusEnum)),
  transactionType: joi.string().valid(...Object.values(transactionTypeEnum)),
  transactionStatus: joi
    .string()
    .valid(...Object.values(transactionStatusEnum)),
  amount: joi.number().min(0.01),
};
