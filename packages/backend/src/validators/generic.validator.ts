import { NextFunction, Request, Response } from "express";
import TryCatch from "../utils/try-catch.decorator";
import TodoService from "../services/todo.service";
import Joi from "joi";

@TryCatch
export class GenericValidator {
  constructor(private todoService: TodoService) {}

  async isBodyValidTodo(req: Request, res: Response, next: NextFunction) {
      await Joi.object({
        name: Joi.string().trim().required(),
        description: Joi.string().trim().required(),
        isCompleted: Joi.boolean(),
        isPrivate: Joi.boolean()
      }).validateAsync(req.body)
      next()
  }

  async isTodoExists(req: Request, res: Response, next: NextFunction) {
    if (await this.todoService.findById(req.params.id)) return next()

    return res.status(404).send('Todo not found')
  }
}

const validator = new GenericValidator(new TodoService());
export default validator;