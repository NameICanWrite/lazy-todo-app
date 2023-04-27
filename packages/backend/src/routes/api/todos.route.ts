import { Router } from 'express';

import todoController from '../../controllers/todo.controller';
import validator from '../../validators/generic.validator';
import { Todo } from '../../entities/Todo';

const todosRouter: Router = Router();

todosRouter.get('/', todoController.getAllTodo.bind(todoController));
todosRouter.post('/', 
  validator.isBodyValidEntity.bind(validator)(Todo),
  todoController.createTodo.bind(todoController)
)
todosRouter.get('/complete/:id', 
  validator.isEntityExistsById.bind(validator)(Todo),
  todoController.completeTodo.bind(todoController)
)
todosRouter.put('/:id', 
  validator.isBodyValidEntity.bind(validator)(Todo),
  validator.isEntityExistsById.bind(validator)(Todo),
  todoController.editTodo.bind(todoController)
)
todosRouter.get('/one/:id', 
  validator.isEntityExistsById.bind(validator)(Todo),
  todoController.getOneTodo.bind(todoController)
)
todosRouter.delete('/:id',
  validator.isEntityExistsById.bind(validator)(Todo), 
  todoController.deleteTodo.bind(todoController)
)

export default todosRouter;
