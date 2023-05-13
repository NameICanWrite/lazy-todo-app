import { User } from './../entities/User';
export default class UserService {
    findAll(): Promise<User[]>;
    create({ email, password }: {
        email: string;
        password: string;
    }): Promise<User>;
    changePassword(id: string, password: string): Promise<import("typeorm").UpdateResult>;
    findById(id: string): Promise<User | null>;
    findByEmail(email: string): Promise<User | null>;
    addPasswordResetCode(email: string, code: string): Promise<void>;
    delete(id: string): Promise<void>;
    isUserExists(id: string): Promise<boolean>;
}
