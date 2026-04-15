import { Router } from "express";
import {

  login,
  signup,
} from "./auth.service.js";
import { validationMiddleware } from "../../middleware/index.js";
import { loginSchema, signupSchema } from "./auth.validation.js";
const authRouter = Router();
authRouter.post("/signup", validationMiddleware(signupSchema), signup);
authRouter.post("/login", validationMiddleware(loginSchema), login);
export default authRouter;
