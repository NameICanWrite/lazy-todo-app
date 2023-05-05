
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
    }, true)
  }
  editTodo(todo: ITodo) {
    return this.put({
      url: `todos/${todo.id}`,
      data: {...todo, id: undefined},
    }, true)
  }
  deleteTodo(todoId: string) {
    return this.delete({
      url: `todos/${todoId}`,
    }, true)
  }
  createTodo(todo: ITodoCreate) {
    return this.post({
      url: 'todos',
      data: todo,
    }, true)
  }
  getOneTodo(todoId: string) {
    return this.get({
      url: `todos/one/${todoId}`,
    }, true)
  }
  completeTodo(todoId: string) {
    return this.get({
      url: `todos/complete/${todoId}`,
    }, true)
  }
}

const todoService = new TodoService()
export default todoService