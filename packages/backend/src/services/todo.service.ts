import { IUser } from '../types/user.type';
import { ITodo } from '../types/todos.type';
import { Todo } from './../entities/Todo';
import { DeepPartial, ILike, In, Like, Not } from 'typeorm';
import { User } from '../entities/User';

import { entityTypes } from '../consts';

export default class TodoService {
    async findAll() {
        const todos = await Todo.find({
            order: {
                id: 'ASC'
            }
        })
        return todos
    }

  async findAllPublic({search}: {search: string | undefined}) {
    let todos 
    if (search) {
      todos = await Todo.find({where: {
          isPrivate: false, 
          name: ILike(`%${search || ''}%`)
        },
        relations: ['user']
      })
    } else {
      todos = await Todo.find({where: {
          isPrivate: false, 
        },
        relations: ['user']
      })
    }
    return todos || [];
  }

  async findAllCompleted({ search}: { search: string | undefined}) {
    let todos 
    if (search) {
      todos = await Todo.find({where: {
          isCompleted: true, 
          name: ILike(`%${search || ''}%`)
        },
        relations: ['user']
      })
    } else {
      todos = await Todo.find({where: {
          isCompleted: true, 
        },
        relations: ['user']
      })
    }
    return todos || [];
  }

  async create(todo: ITodo, user: User) {
    todo.user = user
    const toBeSaved = await Todo.save(todo as DeepPartial<Todo>)
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
