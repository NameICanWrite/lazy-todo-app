import { BaseEntity } from 'typeorm';
import { User } from './User';
export declare class Todo extends BaseEntity {
    id: string;
    name: string;
    description: string;
    isPrivate: boolean;
    isCompleted: boolean;
    user: User;
}
