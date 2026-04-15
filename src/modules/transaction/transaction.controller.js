import { Router } from "express";
import {
  deposit,
  withdraw,
  getMyTransactions,
  getTransactionById,
} from "./transaction.service.js";
import {
  authenticate,
  authorize,
  validationMiddleware,
} from "../../middleware/index.js";
import {
  transactionActionSchema,
  getTransactionsSchema,
  getTransactionByIdSchema,
} from "./transaction.validation.js";
import { roleEnum } from "../../common/enums/index.js";

const transactionRouter = Router();

transactionRouter.use(authenticate, authorize([roleEnum.User]));

transactionRouter.post(
  "/deposit",
  validationMiddleware(transactionActionSchema),
  deposit,
);
transactionRouter.post(
  "/withdraw",
  validationMiddleware(transactionActionSchema),
  withdraw,
);

transactionRouter.get(
  "/my",
  validationMiddleware(getTransactionsSchema),
  getMyTransactions,
);
transactionRouter.get(
  "/:id",
  validationMiddleware(getTransactionByIdSchema),
  getTransactionById,
);

export default transactionRouter;
