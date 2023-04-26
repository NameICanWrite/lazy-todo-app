import { Router } from 'express';

import todoController from '../../controllers/todo.controller';
import validator from '../../validators/generic.validator';

const todosRouter: Router = Router();

todosRouter.get('/', todoController.getAllTodo.bind(todoController));
todosRouter.post('/', 
  validator.isBodyValidTodo,
  todoController.createTodo.bind(todoController)
)
todosRouter.get('/complete/:id', 
  validator.isTodoExists.bind(validator),
  todoController.completeTodo.bind(todoController)
)
todosRouter.put('/:id', 
  validator.isBodyValidTodo,
  validator.isTodoExists.bind(validator),
  todoController.editTodo.bind(todoController)
)
todosRouter.get('/one/:id', 
  validator.isTodoExists.bind(validator),
  todoController.getOneTodo.bind(todoController)
)
todosRouter.delete('/:id',
  validator.isTodoExists.bind(validator), 
  todoController.deleteTodo.bind(todoController)
)

export default todosRouter;
