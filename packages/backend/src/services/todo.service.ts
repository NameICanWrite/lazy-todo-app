import { ITodo } from '../types/todos.type';
import { Todo } from './../entities/Todo';
import { DeepPartial } from 'typeorm';

export default class TodoService {
  async findAll() {
    const todos = await Todo.find({
      order: {
        id: 'ASC'
      }
    })
    return todos;
  }

  async create(todo: ITodo) {
    const toBeSaved = await Todo.save(todo as DeepPartial<Todo>)
  }

  async edit(id: string, newTodo: ITodo) {
    const todo = await Todo.update(id, newTodo)
    return todo
  }

  async findById(id: string) {
    const todo = await Todo.findOneBy({id})
    return todo
  }

  async complete(id: string) {
    const todo = await Todo.update(id, {isCompleted: true})
    return todo
  }

  async delete(id: string) {
    await Todo.delete(id)
  }

  async isTodoExists(id: string) {
    return !!(await this.findById(id))
  }
}
