import Joi from "joi"

const validationSchemas = {
  todos: Joi.object({
      name: Joi.string().trim().required(),
      description: Joi.string().trim().required(),
      isCompleted: Joi.boolean(),
      isPrivate: Joi.boolean()
    })
  }

export default validationSchemas
