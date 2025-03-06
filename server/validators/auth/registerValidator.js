import Joi from "joi";

const registerValidator = Joi.object({

  username: Joi.string().required().trim().min(3).max(30),
  email: Joi.string().required().trim().email(),
  password: Joi.string().required().min(3).max(50),
  password_confirmation: Joi.string().required().valid(Joi.ref("password")).max(50)
}).options({abortEarly: false});

export default registerValidator;