import { ITodo } from './../types/todos.type';
import e, { Response, Request, NextFunction } from 'express';
import TodoService from '../services/todo.service';
import TryCatch from '../utils/try-catch.decorator';
import Joi from 'joi';
import { Todo } from './../entities/Todo';
import { User } from '../entities/User';


@TryCatch
export class TodoController {
  constructor(private todoService: TodoService) {}

  // async getAllVisibleTodos(req: Request & {user: User}, res: Response) {
  //   const currentUserTodos = (req.user as User)?.todos || []
  //   const currentUserTodosIds = currentUserTodos.map((todo: ITodo) => todo.id) ?? []
  //   let todos = await this.todoService.findAllPublic({excludeIds: currentUserTodosIds as string[]});
  //   todos = todos.concat(currentUserTodos)
  //   return todos
  // }

  async getAllVisibleTodosAndFilter(
      req: Request & {
        user: User, 
        todos: Todo[], 
        query: {
          status: 'completed' | 'private' | 'public' | undefined, 
          search: string | undefined, 
          fromIndex: string, 
          toIndex: string}
      }, 
      res: Response, 
      next: NextFunction
    ) {
      let {status, search, fromIndex, toIndex} = req.query
      let todos = []
      const removeOthersPrivateTodos = (todo: ITodo) => {
        if (todo && (!todo.isPrivate || todo.user?.id == req.user?.id)) return true
        else return false
      }

      switch(status) {
        case 'completed': 
          todos = await this.todoService.findAllCompleted({search})
          console.log(todos);
          todos = todos.filter(removeOthersPrivateTodos)
          break

        case 'private': 
          todos = req.user?.todos.filter(todo => todo.isPrivate && (!search || todo.name.match(search)))
          break 

        case 'public': 
          todos = await this.todoService.findAllPublic({search})
          todos = todos.filter(todo => !todo.isPrivate)
          break

        default:
          todos = await this.todoService.findAllPublic({search})
          const currentUserPrivateTodos = req.user?.todos.filter(todo => todo.isPrivate && (!search || todo.name.match(search)))
          if (currentUserPrivateTodos) todos = todos?.concat(currentUserPrivateTodos))\
          break
      }

    if (!todos) return []
    const totalTodos = todos.length
    if (!fromIndex) fromIndex = 0
    if (!toIndex) toIndex = todos.length
    console.log(fromIndex, toIndex);
    todos = todos.slice(parseInt(fromIndex), parseInt(toIndex) + 1)
    return {totalTodos, todos}
  }

  async createTodo(req: Request<{id: string}, any, ITodo> & {user: User, res: Response}) {
    const todo = await this.todoService.create(req.body, req.user as User)
    return todo
  }

  async getOneTodo(req: Request<{id: string}> & {user: User}, res: Response) {
    const todo = await this.todoService.findById(req.params.id)
    const isOwner = (req.user as User)?.todos.some(todo => todo.id == req.params.id)
    if (todo?.isPrivate && !isOwner) {
      res.status(404) 
      return'Todo Not Found'
    } 
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



