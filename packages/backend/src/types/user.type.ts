import { Todo } from "../entities/Todo";

export interface IUser {
  id?: string;
  email: string;
  password: string;
  todos?: Todo[];
}

export interface IJwtAuthPayload {
  uid: string
}

export interface ISignupFields {
  name: string,
  email: string,
}