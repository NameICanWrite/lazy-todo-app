import { IUser } from '../types/user.type';
import { ITodo } from '../types/todos.type';
import { Todo } from './../entities/Todo';
import { DeepPartial, In, Not } from 'typeorm';
import { User } from '../entities/User';

import { entityTypes } from '../consts';

export default class TodoService {
  async findAll() {
    const todos = await Todo.find({
      order: {
        id: 'ASC'
      }
    })
    return todos;
  }

  async findAllPublic({excludeIds}: {excludeIds: string[]}) {
    const todos = await Todo.find({where: {
        isPrivate: false, 
        id: Not(In(excludeIds))
      },
      relations: ['user']
    })
    return todos;
  }

  async create(todo: ITodo, user: User) {
    todo.user = user
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
