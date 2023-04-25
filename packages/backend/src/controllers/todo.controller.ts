import { ITodo } from './../types/todos.type';
import e, { Response, Request, NextFunction } from 'express';
import TodoService from '../services/todo.service';
import TryCatch from '../utils/try-catch.decorator';


@TryCatch
export class TodoController {
  constructor(private todoService: TodoService) {}

  async getAllTodo(_: Request, res: Response) {
    const todos = await this.todoService.findAll();
    throw new Error()
  }

  async createTodo(req: Request, res: Response) {
    await this.todoService.create(req.body)
    res.send('Todo created')
  }

  async getOneTodo(req: Request, res: Response) {
    const todo = await this.todoService.findById(req.params.id)
    res.send(todo) 
  }

  async deleteTodo(req: Request, res: Response) {
    await this.todoService.delete(req.params.id)
    res.send('Todo deleted')
  }

  async editTodo(req: Request, res: Response) {
    const todo = req.body
    await this.todoService.edit(req.params.id, todo)
    res.send('Todo updated')
  }

  async completeTodo(req: Request, res: Response) {
    const todo = req.body
    await this.todoService.complete(req.params.id)
    res.send('Todo completed')
  }

  isBodyValidTodo(req: Request, res: Response, next: NextFunction) {
    if (isTodo(req.body)) return next()
    
    return res.status(400).send('Invalid todo')
  }

  async isTodoExists(req: Request, res: Response, next: NextFunction) {
    if (await this.todoService.findById(req.params.id)) return next()

    return res.status(404).send('Todo not found')
  }
}

const todoController = new TodoController(new TodoService());
export default todoController;

function isTodo(obj: any): obj is ITodo {
  const hasUnexpectedProps = (() => {
    const expectedProps = ['name', 'description', 'isPrivate', 'isCompleted', 'id', ]
    for (let i in obj) {
      if (!expectedProps.includes(i)) return false
    }
    return true
  })()

  if (
      typeof obj.name === 'string' 
      && typeof obj.description === 'string' 
      && typeof obj.isPrivate === 'boolean'
      && (typeof obj.isCompleted === 'boolean' || !obj.isCompleted)
      && (typeof obj.id === 'string' || !obj.id)
      && !hasUnexpectedProps
      ) return true
      
  return false
}



