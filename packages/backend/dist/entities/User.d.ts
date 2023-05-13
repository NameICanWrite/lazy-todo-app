import { BaseEntity } from 'typeorm';
import { Todo } from './Todo';
export declare class User extends BaseEntity {
    id: string;
    email: string;
    password: string;
    passwordResetCode: string;
    passwordResetCodeExpiresAt: string;
    todos: Array<Todo>;
}
