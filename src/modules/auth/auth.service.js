import {
  ACCESS_TOKEN_EXPIRATION_AFTER,
  ACCESS_TOKEN_SECRET,
} from "../../../config/config.service.js";
import { SET } from "../../common/services/index.js";
import { create, findOne, User, Account } from "./../../DB/index.js";
import {
  conflictException,
  unauthorizedException,
  successResponse,
  generateHash,
  compare,
  generateToken,
} from "./../../common/utils/index.js";

export const signup = async (req, res) => {
  const { fullName, email, password } = req.body;

  const emailExist = await findOne({ filter: { email }, model: User });
  if (emailExist) {
    throw conflictException("Email already exists");
  }

  const user = await create({
    data: {
      fullName,
      email,
      password: await generateHash(password),
    },
    model: User,
  });
  const generatedAccountNumber = Math.floor(
    1000000000 + Math.random() * 9000000000,
  ).toString();

  await create({
    data: {
      userId: user._id,
      accountNumber: generatedAccountNumber,
      balance: 0,
    },
    model: Account,
  });

  return successResponse({
    res,
    message: "User registered successfully",
    statusCode: 201,
  });
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await findOne({
    filter: { email },
    model: User,
  });

  if (!user) {
    await compare(
      "$argon2id$v=19$m=65536,t=3,p=4$someRandomSalt123$someRandomHashValue456",
      password,
    );
    throw unauthorizedException("Invalid login credentials");
  }

  const isPasswordValid = await compare(user.password, password);

  if (!isPasswordValid) {
    throw unauthorizedException("Invalid login credentials");
  }

  const accessToken = generateToken({
    payload: { userId: user._id },
    signature: ACCESS_TOKEN_SECRET,
    expiresIn: ACCESS_TOKEN_EXPIRATION_AFTER,
  });

  await SET({
    key: `user_tokens:${user._id}:${accessToken}`,
    value: "valid",
    expiration: parseInt(ACCESS_TOKEN_EXPIRATION_AFTER) * 60,
  });

  return successResponse({
    res,
    message: "User logged in successfully",
    data: { accessToken },
  });
};
