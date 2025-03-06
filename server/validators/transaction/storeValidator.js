import Joi from "joi";
import mongoose from "mongoose";

const storeValidator = Joi.object({
  type: Joi.string().valid("income", "expense").required(),
  description: Joi.string().trim().required().min(3).max(50),
  amount: Joi.number().positive().required(),
  date: Joi.date().required(),
}).options({ abortEarly: false });

export default storeValidator;