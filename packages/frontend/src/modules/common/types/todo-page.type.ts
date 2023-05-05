import { ITodo } from "./todos.type";

export type PagedTodo = {
  todos: ITodo[];
  totalTodos: number;
  hasNextPage: boolean;
  page: number;
}