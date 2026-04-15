import { Router } from "express";
import { getMyAccount} from "./account.service.js";
import {
  authenticate,
  authorize,

} from "../../middleware/index.js";
import { roleEnum } from "../../common/enums/index.js";

const accountRouter = Router();

accountRouter.get(
  "/me",
  authenticate,
  authorize([roleEnum.User]),
  getMyAccount,
);

export default accountRouter;
