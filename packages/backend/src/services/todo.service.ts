import { Todo } from './../entities/Todo';


export default class TodoService {
  async findAll() {
    const todos = await Todo.find()
    return todos;
  }

  async create(todo: Todo) {
    await Todo.save(todo)
  }

  async edit(id: string, newTodo: Todo) {
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
