import { ITodo } from '../types/todos.type';
import { Todo } from './../entities/Todo';
import { User } from '../entities/User';
export default class TodoService {
    findAll({ userId, fromIndex, toIndex, search, status }: {
        userId: number | undefined;
        fromIndex: number | undefined;
        toIndex: number | undefined;
        search: string | undefined;
        status: string | undefined;
    }): Promise<{
        totalTodos: number;
        todos: Todo[];
        page: number;
        hasNextPage: boolean;
    }>;
    findAllPublic({ search }: {
        search: string | undefined;
    }): Promise<Todo[]>;
    findAllCompleted({ search }: {
        search: string | undefined;
    }): Promise<Todo[]>;
    create(todo: ITodo, user: User): Promise<Todo>;
    edit(id: string, newTodo: ITodo): Promise<import("typeorm").UpdateResult>;
    findById(id: string): Promise<Todo | null>;
    complete(id: string): Promise<import("typeorm").UpdateResult>;
    delete(id: string): Promise<void>;
    isTodoExists(id: string): Promise<boolean>;
}
