import { User } from "../entities/User";
import { IUser } from "./user.type";
export interface ITodo {
    id?: string;
    name: string;
    description: string;
    isPrivate: boolean;
    isCompleted?: boolean;
    user: IUser | User;
}
