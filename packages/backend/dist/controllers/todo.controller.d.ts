import { ITodo } from './../types/todos.type';
import { Response, Request, NextFunction } from 'express';
import TodoService from '../services/todo.service';
import { Todo } from './../entities/Todo';
import { User } from '../entities/User';
export declare class TodoController {
    private todoService;
    constructor(todoService: TodoService);
    getAllVisibleTodosAndFilter(req: Request & {
        user: User;
        todos: Todo[];
        query: {
            status: string;
            search: string | undefined;
            fromIndex: string;
            toIndex: string;
        };
    }, res: Response, next: NextFunction): Promise<{
        totalTodos: number;
        todos: Todo[];
        page: number;
        hasNextPage: boolean;
    }>;
    createTodo(req: Request<{
        id: string;
    }, any, ITodo> & {
        user: User;
        res: Response;
    }): Promise<Todo>;
    getOneTodo(req: Request<{
        id: string;
    }> & {
        user: User;
    }, res: Response): Promise<Todo | "Todo Not Found" | null>;
    deleteTodo(req: Request<{
        id: string;
    }>, res: Response): Promise<string>;
    editTodo(req: Request<{
        id: string;
    }, any, ITodo>, res: Response): Promise<string>;
    completeTodo(req: Request<{
        id: string;
    }>, res: Response): Promise<string>;
}
declare const todoController: TodoController;
export default todoController;
