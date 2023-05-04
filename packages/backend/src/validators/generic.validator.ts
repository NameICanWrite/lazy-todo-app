import { NextFunction, Request, Response } from "express";
import TryCatch from "../utils/try-catch.decorator";
import TodoService from "../services/todo.service";
import Joi from "joi";
import { BaseEntity, EntityTarget, getMetadataArgsStorage } from "typeorm";
import validationSchemas from "./validation.schemas";

class EntityWithId extends BaseEntity {
  id: number;
}

import { entityTypes } from '../consts';

@TryCatch
export class GenericValidator {
  constructor() {}
  
  isBodyValidEntity(Entity:  any) {
    let entityType
    if(!(typeof Entity === 'string')) {
      entityType = findTableFromEntity(Entity)
    } else {
      entityType = Entity
    }
    
    let joiSchema: Joi.ObjectSchema
    if (entityType && validationSchemas.hasOwnProperty(entityType)) {
      const entityProp = entityType as keyof typeof validationSchemas
      joiSchema = validationSchemas[entityProp]
    } 
    
    return TryCatch(
    async function(req: Request, res: Response, next: NextFunction) {
      await joiSchema.validateAsync(req.body)
      next()
    })
  }

  isEntityExistsById(Entity: any) {
    return TryCatch(async function(req: Request, res: Response, next: NextFunction) {
      if (await Entity.findOneBy({id: req.params.id})) {
        return next()
      }
      res.status(404) 
      const entityType = findTableFromEntity(Entity)
      return entityType + ' not found'
    })
  }
}

const validator = new GenericValidator();
export default validator;

function findTableFromEntity(Entity: any): string | undefined {
  const table = getMetadataArgsStorage().tables.find(t => t.target === Entity);
  return table?.name || undefined
}
