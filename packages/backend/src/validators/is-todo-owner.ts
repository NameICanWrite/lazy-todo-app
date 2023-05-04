import { NextFunction, Request, Response } from "express";
import { User } from "../entities/User";
import TryCatch from "../utils/try-catch.decorator";

export const isTodoOwner = TryCatch(async function(req: Request, res: Response, next: NextFunction) {
if ((req.user as User)?.todos.some(todo => todo.id == req.params.id)) {
  return next()
}
res.status(400)
return 'You don\'t own this todo'
})
