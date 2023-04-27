import { Router } from 'express';

import todoController from '../../controllers/todo.controller';
import validator from '../../validators/generic.validator';

const todosRouter: Router = Router();

todosRouter.get('/', todoController.getAllTodo.bind(todoController));
todosRouter.post('/', 
  validator.isBodyValidEntity.bind(validator)('todo'),
  todoController.createTodo.bind(todoController)
)
todosRouter.get('/complete/:id', 
  validator.isEntityExistsById.bind(validator)('todo'),
  todoController.completeTodo.bind(todoController)
)
todosRouter.put('/:id', 
  validator.isBodyValidEntity.bind(validator)('todo'),
  validator.isEntityExistsById.bind(validator)('todo'),
  todoController.editTodo.bind(todoController)
)
todosRouter.get('/one/:id', 
  validator.isEntityExistsById.bind(validator)('todo'),
  todoController.getOneTodo.bind(todoController)
)
todosRouter.delete('/:id',
  validator.isEntityExistsById.bind(validator)('todo'), 
  todoController.deleteTodo.bind(todoController)
)

export default todosRouter;
