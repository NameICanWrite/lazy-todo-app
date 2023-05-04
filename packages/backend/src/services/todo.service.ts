import { IUser } from '../types/user.type';
import { ITodo } from '../types/todos.type';
import { Todo } from './../entities/Todo';
import { DeepPartial, ILike, In, Like, Not } from 'typeorm';
import { User } from '../entities/User';

import { entityTypes } from '../consts';

export default class TodoService {
  async findAll({userId =-1, fromIndex = 0, toIndex = -1, search = '', status = ''} :{
    userId: number | undefined, fromIndex: number | undefined, toIndex: number | undefined, search: string | undefined, status: string | undefined
  }) {
    let todos = await Todo
      .createQueryBuilder('todos')
      .leftJoinAndSelect('todos.user', 'user')
      .where(`((todos.name like :search) OR (todos.description like :search) OR (:search = ''))`, { search: `%${search || ''}%` })
      .andWhere(`(
          (:status = 'completed' AND todos.isCompleted = true AND ((todos.isPrivate = false) OR (todos.user.id = :userId)))
          OR (:status = 'public' AND (todos.isPrivate = false)) 
          OR ((:status = 'private') AND (todos.user.id = :userId) AND (todos.isPrivate = true))
          OR ((:status = '') AND ((todos.isPrivate = false) OR (todos.user.id = :userId)))
        )`, { status: status, userId: userId }
      )
      .skip(fromIndex || 0)
      .take((toIndex - fromIndex + 1) || 10000)
      .getMany()
    if (!todos) todos = []
    return { totalTodos: todos.length, todos }
  }

  async findAllPublic({ search }: { search: string | undefined }) {
    let todos
    if (search) {
      todos = await Todo.find({
        where: {
          isPrivate: false,
          name: ILike(`%${search || ''}%`)
        },
        relations: ['user']
      })
    } else {
      todos = await Todo.find({
        where: {
          isPrivate: false,
        },
        relations: ['user']
      })
    }
    return todos || [];
  }

  async findAllCompleted({ search }: { search: string | undefined }) {
    let todos
    if (search) {
      todos = await Todo.find({
        where: {
          isCompleted: true,
          name: ILike(`%${search || ''}%`)
        },
        relations: ['user']
      })
    } else {
      todos = await Todo.find({
        where: {
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
    return toBeSaved
  }

  async edit(id: string, newTodo: ITodo) {
    const todo = await Todo.update(id, newTodo)
    return todo
  }

  async findById(id: string) {
    const todo = await Todo.findOneBy({ id })
    return todo
  }

  async complete(id: string) {
    const todo = await Todo.update(id, { isCompleted: true })
    return todo
  }

  async delete(id: string) {
    await Todo.delete(id)
  }

  async isTodoExists(id: string) {
    return !!(await this.findById(id))
  }
}
