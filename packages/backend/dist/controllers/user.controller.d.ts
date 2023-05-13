import { Request, Response, NextFunction } from 'express';
import { User } from '../entities/User';
import UserService from '../services/user.service';
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    signup(req: Request, res: Response, next: NextFunction): Promise<{
        message: string;
        tokenPayload?: undefined;
    } | {
        message: string;
        tokenPayload: {
            uid: string;
        };
    }>;
    login(req: Request<any, any, {
        email: string;
        password: string;
    }>, res: Response, next: NextFunction): Promise<{
        message: string;
        tokenPayload?: undefined;
    } | {
        message: User;
        tokenPayload: {
            uid: string;
        };
    }>;
    signupAndRedirectToFrontend(req: Request, res: Response, next: NextFunction): Promise<void>;
    sendSignupEmailConfirmation(req: Request, res: Response, next: NextFunction): Promise<"Confirmation email sent" | {
        message: string;
    }>;
    sendResetPasswordCodeEmail(req: Request, res: Response, next: NextFunction): Promise<"Email with code sent" | {
        message: string;
    }>;
    resetPasswordWithCode(req: Request<any, any, {
        email: string;
        code: string;
        newPassword: string;
    }>, res: Response, next: NextFunction): Promise<"User doesnt exist" | "Code invalid or has expired" | "Password changed successfully!">;
    getCurrentUser(req: Request & {
        user: User;
    }, res: Response): Promise<{
        password: undefined;
        passwordResetCode: undefined;
        passwordResetCodeExpiresAt: undefined;
        id: string;
        email: string;
        todos: import("../entities/Todo").Todo[];
    }>;
    getCurrentUserTodos(req: Request & {
        user: User;
    }, res: Response): Promise<import("../entities/Todo").Todo[]>;
    changePasswordSecure(req: Request<any, any, {
        oldPassword: string;
        newPassword: string;
    }> & {
        user: User;
    }, res: Response): Promise<"Old password incorrect" | "Password changed successfully">;
    changePassword(req: Request<any, any, {
        newPassword: string;
    }> & {
        user: User;
    }, res: Response): Promise<string>;
}
export declare const userController: UserController;
