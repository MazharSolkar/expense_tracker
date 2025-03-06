import Joi from "joi";

const loginValidator = Joi.object({

  email: Joi.string().required().trim().email(),
  password: Joi.string().required().max(50),
}).options({abortEarly: false});

export default loginValidator;