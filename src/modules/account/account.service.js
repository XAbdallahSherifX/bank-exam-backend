import { Account, findOne } from "../../DB/index.js";
import {
  notFoundException,
  successResponse,
} from "../../common/utils/index.js";

export const getMyAccount = async (req, res) => {
  const account = await findOne({
    filter: { userId: req.user._id },
    model: Account,
  });

  if (!account) {
    throw notFoundException("Account not found for this user");
  }

  return successResponse({
    res,
    message: "Account details retrieved successfully",
    data: { account },
  });
};
