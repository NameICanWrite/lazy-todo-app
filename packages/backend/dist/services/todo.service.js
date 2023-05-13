"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Todo_1 = require("./../entities/Todo");
const typeorm_1 = require("typeorm");
class TodoService {
    async findAll({ userId = -1, fromIndex = 0, toIndex = -1, search = '', status = '' }) {
        let todosQuery = Todo_1.Todo
            .createQueryBuilder('todos')
            .leftJoinAndSelect('todos.user', 'user')
            .where(`((todos.name like :search) OR (todos.description like :search) OR (:search = ''))`, { search: `%${search || ''}%` })
            .andWhere(`(
          (:status = 'completed' AND todos.isCompleted = true AND ((todos.isPrivate = false) OR (todos.user.id = :userId)))
          OR (:status = 'public' AND (todos.isPrivate = false)) 
          OR ((:status = 'private') AND (todos.user.id = :userId) AND (todos.isPrivate = true))
          OR ((:status = '') AND ((todos.isPrivate = false) OR (todos.user.id = :userId)))
        )`, { status: status, userId: userId })
            .select([
            'todos.id', 'todos.name', 'todos.description', 'todos.isPrivate', 'todos.isCompleted',
            'user.id', 'user.email',
        ]);
        const totalTodos = await todosQuery.getCount();
        const todos = await todosQuery
            .skip(fromIndex || 0)
            .take((toIndex - fromIndex + 1) || 10000)
            .orderBy('todos.id', 'DESC')
            .getMany();
        if (!todos)
            todos = [];
        const todosOnPage = toIndex - fromIndex;
        const maxWithCurrentPages = totalTodos + (totalTodos % todosOnPage);
        const page = Math.floor((toIndex + 1) / todosOnPage);
        const hasNextPage = totalTodos > toIndex;
        console.log({ totalTodos, todos, page });
        return { totalTodos, todos, page, hasNextPage };
    }
    async findAllPublic({ search }) {
        let todos;
        if (search) {
            todos = await Todo_1.Todo.find({
                where: {
                    isPrivate: false,
                    name: (0, typeorm_1.ILike)(`%${search || ''}%`)
                },
                relations: ['user']
            });
        }
        else {
            todos = await Todo_1.Todo.find({
                where: {
                    isPrivate: false,
                },
                relations: ['user']
            });
        }
        return todos || [];
    }
    async findAllCompleted({ search }) {
        let todos;
        if (search) {
            todos = await Todo_1.Todo.find({
                where: {
                    isCompleted: true,
                    name: (0, typeorm_1.ILike)(`%${search || ''}%`)
                },
                relations: ['user']
            });
        }
        else {
            todos = await Todo_1.Todo.find({
                where: {
                    isCompleted: true,
                },
                relations: ['user']
            });
        }
        return todos || [];
    }
    async create(todo, user) {
        todo.user = user;
        const toBeSaved = await Todo_1.Todo.save(todo);
        return toBeSaved;
    }
    async edit(id, newTodo) {
        const todo = await Todo_1.Todo.update(id, newTodo);
        return todo;
    }
    async findById(id) {
        const todo = await Todo_1.Todo.findOne({ where: { id }, relations: ['user'] });
        return todo;
    }
    async complete(id) {
        const todo = await Todo_1.Todo.update(id, { isCompleted: true });
        return todo;
    }
    async delete(id) {
        await Todo_1.Todo.delete(id);
    }
    async isTodoExists(id) {
        return !!(await this.findById(id));
    }
}
exports.default = TodoService;
//# sourceMappingURL=todo.service.js.map