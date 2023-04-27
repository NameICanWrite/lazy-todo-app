import { ITodo } from './../types/todos.type';
import e, { Response, Request, NextFunction } from 'express';
import TodoService from '../services/todo.service';
import TryCatch from '../utils/try-catch.decorator';
import Joi from 'joi';
import { Todo } from './../entities/Todo';


@TryCatch
export class TodoController {
  constructor(private todoService: TodoService) {}

  async getAllTodo(req: Request, res: Response) {
    const todos = await this.todoService.findAll();
    return todos
  }

  async createTodo(req: Request<{id: string}, any, ITodo>, res: Response) {
    await this.todoService.create(req.body)
    return 'Todo created'
  }

  async getOneTodo(req: Request<{id: string}>, res: Response) {
    const todo = await this.todoService.findById(req.params.id)
    return todo 
  }

  async deleteTodo(req: Request<{id: string}>, res: Response) {
    await this.todoService.delete(req.params.id)
    return 'Todo deleted'
  }

  async editTodo(req: Request<{id: string}, any, ITodo>, res: Response) {
    const todo = req.body
    await this.todoService.edit(req.params.id, todo)
    return 'Todo updated'
  }

  async completeTodo(req: Request<{id: string}>, res: Response) {
    const todo = req.body
    await this.todoService.complete(req.params.id)
    return 'Todo completed'
  }
}
const todoController = new TodoController(new TodoService());
export default todoController;



