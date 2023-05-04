import { Router } from 'express';

import todoController from '../../controllers/todo.controller';
import validator from '../../validators/generic.validator';
import { Todo } from '../../entities/Todo';
import { authAndGetUser, optionalAuthAndGetUser } from '../../middlewares/auth.middleware';
import { isTodoOwner } from '../../validators/is-todo-owner';

const todosRouter: Router = Router();

todosRouter.get('/', 
optionalAuthAndGetUser,
todoController.getAllVisibleTodosAndFilter.bind(todoController)
);
todosRouter.post('/', 
  authAndGetUser,
  validator.isBodyValidEntity.bind(validator)(Todo),
  todoController.createTodo.bind(todoController)
)
todosRouter.get('/complete/:id', 
  authAndGetUser,
  validator.isEntityExistsById.bind(validator)(Todo),
  isTodoOwner,
  todoController.completeTodo.bind(todoController)
)
todosRouter.put('/:id', 
  authAndGetUser,
  validator.isBodyValidEntity.bind(validator)(Todo),
  validator.isEntityExistsById.bind(validator)(Todo),
  isTodoOwner,
  todoController.editTodo.bind(todoController)
)
todosRouter.get('/one/:id', 
  optionalAuthAndGetUser,
  validator.isEntityExistsById.bind(validator)(Todo),
  todoController.getOneTodo.bind(todoController)
)
todosRouter.delete('/:id',
  authAndGetUser,
  validator.isEntityExistsById.bind(validator)(Todo),
  isTodoOwner, 
  todoController.deleteTodo.bind(todoController)
)

export default todosRouter;
