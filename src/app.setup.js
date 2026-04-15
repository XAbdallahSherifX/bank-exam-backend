import express from "express";
import { PORT } from "../config/config.service.js";
import {
  globalErrorHandler,
  notFoundException,
  successResponse,
} from "./common/utils/index.js";
import { connectDB, connectRedis } from "./DB/index.js";
import { authRouter, transactionRouter ,accountRouter } from "./modules/index.js";
import cors from "cors";
import rateLimit from "express-rate-limit";

export default async function bootstrap() {
  await connectDB();
  await connectRedis();

  const app = express();
  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message:
      "Too many requests from this IP, please try again after 15 minutes",
    standardHeaders: true,
    legacyHeaders: false,
  });

  app.use(cors(), express.json());

  app.use(limiter);

  app.get("/", (req, res) => {
    successResponse({
      res,
      message: "Welcome to Saraha App api",
      statusCode: 200,
    });
  });

  app.use("/auth", authRouter);
  app.use("/transactions", transactionRouter);
  app.use("/accounts", accountRouter);

  app.get("{/*dummy}", (req, res) => {
    notFoundException("Invalid Route");
  });

  app.use(globalErrorHandler);

  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}
