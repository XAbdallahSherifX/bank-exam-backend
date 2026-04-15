import mongoose from "mongoose";
import { Account, Transaction, findOne } from "../../DB/index.js";
import {
  badRequestException,
  notFoundException,
  successResponse,
  forbiddenException,
} from "../../common/utils/index.js";
import {
  transactionTypeEnum,
  transactionStatusEnum,
  accountStatusEnum,
} from "../../common/enums/index.js";

export const deposit = async (req, res) => {
  const { amount } = req.body;
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const account = await Account.findOne({ userId: req.user._id }).session(
      session,
    );

    if (!account) throw notFoundException("Account not found");
    if (account.status !== accountStatusEnum.Active) {
      throw forbiddenException(
        `Transactions are prohibited. Account is ${account.status}`,
      );
    }
    const balanceBefore = account.balance;
    const balanceAfter = balanceBefore + amount;
    account.balance = balanceAfter;
    await account.save({ session });
    const [transaction] = await Transaction.create(
      [
        {
          accountId: account._id,
          type: transactionTypeEnum.Deposit,
          amount,
          balanceBefore,
          balanceAfter,
          status: transactionStatusEnum.Completed,
        },
      ],
      { session },
    );
    await session.commitTransaction();
    return successResponse({
      res,
      message: "Deposit successful",
      data: { transaction },
    });
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
};

export const withdraw = async (req, res) => {
  const { amount } = req.body;
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const account = await Account.findOne({ userId: req.user._id }).session(
      session,
    );
    if (!account) throw notFoundException("Account not found");
    if (account.status !== accountStatusEnum.Active) {
      throw forbiddenException(
        `Transactions are prohibited. Account is ${account.status}`,
      );
    }
    if (account.balance < amount) {
      throw badRequestException("Insufficient funds for this withdrawal");
    }
    const balanceBefore = account.balance;
    const balanceAfter = balanceBefore - amount;
    account.balance = balanceAfter;
    await account.save({ session });
    const [transaction] = await Transaction.create(
      [
        {
          accountId: account._id,
          type: transactionTypeEnum.Withdraw,
          amount,
          balanceBefore,
          balanceAfter,
          status: transactionStatusEnum.Completed,
        },
      ],
      { session },
    );
    await session.commitTransaction();
    return successResponse({
      res,
      message: "Withdrawal successful",
      data: { transaction },
    });
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
};

export const getMyTransactions = async (req, res) => {
  const { page, limit, type, sortBy, sortOrder } = req.query;
  const skip = (page - 1) * limit;
  const account = await findOne({
    filter: { userId: req.user._id },
    model: Account,
  });
  if (!account) throw notFoundException("Account not found");
  const filter = { accountId: account._id };
  if (type) filter.type = type;
  const transactions = await Transaction.find(filter)
    .sort({ [sortBy]: sortOrder === "desc" ? -1 : 1 })
    .skip(skip)
    .limit(limit);

  const total = await Transaction.countDocuments(filter);
  return successResponse({
    res,
    message: "Transactions retrieved successfully",
    data: {
      transactions,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(total / limit),
      },
    },
  });
};

export const getTransactionById = async (req, res) => {
  const { id } = req.params;
  const account = await findOne({
    filter: { userId: req.user._id },
    model: Account,
  });
  if (!account) throw notFoundException("Account not found");
  const transaction = await findOne({
    filter: { _id: id, accountId: account._id },
    model: Transaction,
  });

  if (!transaction)
    throw notFoundException("Transaction not found or unauthorized access");
  return successResponse({
    res,
    message: "Transaction retrieved",
    data: { transaction },
  });
};
