import Joi from "joi";
import { globalSchema } from "../../common/utils/index.js";

export const signupSchema = {
  body: Joi.object({
    fullName: globalSchema.firstName.required(),
    email: globalSchema.email.required(),
    password: globalSchema.password.required(),
    confirmPassword: Joi.string()
      .valid(Joi.ref("password"))
      .required()
      .messages({
        "any.only": "confirmPassword must be equal to password",
      })
      .required(),
  }).required(),
};

export const loginSchema = {
  body: Joi.object({
    email: globalSchema.email.required(),
    password: globalSchema.password.required(),
  }).required(),
};
