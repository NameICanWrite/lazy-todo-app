import { NextFunction, Request, Response } from "express";
import TryCatch from "../utils/try-catch.decorator";
import TodoService from "../services/todo.service";
import Joi from "joi";
import { getMetadataArgsStorage } from "typeorm";
import { ITodo } from "../types/todos.type";

@TryCatch
export class GenericValidator {
  constructor() {}

  entitiesMap = {
    todos: {
      joiSchema: Joi.object({
        name: Joi.string().trim().required(),
        description: Joi.string().trim().required(),
        isCompleted: Joi.boolean(),
        isPrivate: Joi.boolean()
      })
    }
  }

  
  isBodyValidEntity(entity: any) {
    const entityType = findTableFromEntity(entity)
    console.log(entityType);
    let joiSchema: Joi.ObjectSchema<ITodo>
    if (this.entitiesMap.hasOwnProperty(entityType)) {
      const entityProp = entityType as keyof typeof this.entitiesMap
      joiSchema = this.entitiesMap[entityProp].joiSchema;
    }
    
    return TryCatch(
    async function(req: Request, res: Response, next: NextFunction) {
      await joiSchema.validateAsync(req.body)
      next()
    })
  }

  isEntityExistsById(Entity: any) {

    return TryCatch(async function(req: Request, res: Response, next: NextFunction) {
      if (await Entity.findOneBy({id: req.params.id})) return next()
      res.status(404)
      
      return 'Todo not found'
    })
  }
}

const validator = new GenericValidator();
export default validator;

function findTableFromEntity(entity: any): string {
  const table = getMetadataArgsStorage().tables.find(t => t.target === entity);
  return table?.name || ''
}
