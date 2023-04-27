import { NextFunction, Request, Response } from "express";
import TryCatch from "../utils/try-catch.decorator";
import TodoService from "../services/todo.service";
import Joi from "joi";

@TryCatch
export class GenericValidator {
  constructor(private todoService: TodoService) {}

  entitiesMap = {
    todo: {
      service: this.todoService,
      joiSchema: Joi.object({
        name: Joi.string().trim().required(),
        description: Joi.string().trim().required(),
        isCompleted: Joi.boolean(),
        isPrivate: Joi.boolean()
      })
    }
  }

  
  isBodyValidEntity(entityType: 'todo') {
    const joiSchema = this.entitiesMap[entityType].joiSchema;

    return TryCatch(
    async function(req: Request, res: Response, next: NextFunction) {
      await joiSchema.validateAsync(req.body)
      next()
    })
  }

  isEntityExistsById(entityType: 'todo') {
    const service = this.entitiesMap[entityType].service

    return TryCatch(async function(req: Request, res: Response, next: NextFunction) {
      if (await service.findById(req.params.id)) return next()
      res.status(404)
      
      return 'Todo not found'
    })
  }
}

const validator = new GenericValidator(new TodoService());
export default validator;
