import Joi from "joi";

const updateValidator = Joi.object({
  type: Joi.string().valid("income", "expense"),
  description: Joi.string().trim().min(3).max(50),
  amount: Joi.number().positive(),
  date: Joi.date(),
}).options({ abortEarly: false });

export default updateValidator;
