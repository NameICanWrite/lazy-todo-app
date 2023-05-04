import Joi from "joi"
import UserService from "../services/user.service"

const validationSchemas = {
  todos: Joi.object({
      name: Joi.string().trim().required(),
      description: Joi.string().trim().required(),
      isCompleted: Joi.boolean(),
      isPrivate: Joi.boolean()
    }),
  signup: Joi.object({
    email: Joi.string().trim().email().required(),
    password: Joi.string().required()
  }).options({ allowUnknown: true }),
  login: Joi.object({
    email: Joi.string().trim().email().required(),
    password: Joi.string().required()
  }),
  withEmail: Joi.object({
    email: Joi.string().trim().email().required()
  }),
  resetPassword: Joi.object({
    code: Joi.string().trim().length(4).required(),
    email: Joi.string().trim().email().required(),
    newPassword: Joi.string().required()
  }).options({ allowUnknown: true })
}

export default validationSchemas
