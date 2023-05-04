// user.service.js
import { ITodo, ITodoCreate } from '../modules/common/types/todos.type';
import HttpService from './http';

class TodoService extends HttpService {
  constructor() {
    super();
  }
  getAllTodos(params: object) {
    return this.get({
      url: 'todos',
      params
    })
  }
  editTodo(todo: ITodo) {
    return this.put({
      url: `todos/${todo.id}`,
      data: {...todo, id: undefined},
    })
  }
  deleteTodo(todoId: string) {
    return this.delete({
      url: `todos/${todoId}`,
    })
  }
  createTodo(todo: ITodoCreate) {
    return this.post({
      url: 'todos',
      data: todo,
    })
  }
  getOneTodo(todoId: string) {
    return this.get({
      url: `todos/one/${todoId}`,
    })
  }
  completeTodo(todoId: string) {
    return this.get({
      url: `todos/complete/${todoId}`,
    })
  }
}

const todoService = new TodoService()
export default todoService