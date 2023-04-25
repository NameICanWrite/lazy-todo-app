import { Router } from 'express';

import todoController from '../../controllers/todo.controller';

const todosRouter: Router = Router();

todosRouter.get('/', todoController.getAllTodo.bind(todoController));
todosRouter.post('/', 
  todoController.isBodyValidTodo,
  todoController.createTodo.bind(todoController)
)
todosRouter.get('/complete/:id', 
  todoController.isTodoExists.bind(todoController),
  todoController.completeTodo.bind(todoController)
)
todosRouter.put('/:id', 
  todoController.isBodyValidTodo,
  todoController.isTodoExists.bind(todoController),
  todoController.editTodo.bind(todoController)
)
todosRouter.get('/one/:id', 
  todoController.isTodoExists.bind(todoController),
  todoController.getOneTodo.bind(todoController)
)
todosRouter.delete('/:id',
  todoController.isTodoExists.bind(todoController), 
  todoController.deleteTodo.bind(todoController)
)

export default todosRouter;
