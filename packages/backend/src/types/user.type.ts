import { Todo } from "../entities/Todo";

export interface IUser {
  id?: string;
  name: string;
  password: string;
  todos?: Todo[];
}

export interface IJwtAuthPayload {
  uid: string
}