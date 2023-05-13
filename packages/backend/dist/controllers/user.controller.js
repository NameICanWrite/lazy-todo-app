"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = exports.UserController = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_service_1 = __importDefault(require("../services/user.service"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const consts_1 = require("../consts");
const mailer_1 = require("../config/mailer");
const crypto_1 = __importDefault(require("crypto"));
class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    async signup(req, res, next) {
        const { email, password } = req.body;
        const existingUser = await this.userService.findByEmail(email);
        if (existingUser) {
            res.status(400);
            return { message: 'User email already exists' };
        }
        const hashedPassword = await bcrypt_1.default.hash(password, 10);
        const newUser = await this.userService.create({ email, password: hashedPassword });
        return { message: 'Signed up successfully!', tokenPayload: { uid: newUser.id } };
    }
    async login(req, res, next) {
        const { email, password } = req.body;
        const user = await this.userService.findByEmail(email);
        if (!user) {
            res.status(401);
            return { message: 'User doesnt exist' };
        }
        const isPasswordCorrect = await bcrypt_1.default.compare(password, user.password);
        if (!isPasswordCorrect) {
            res.status(401);
            return { message: 'Password incorrect' };
        }
        return { message: user, tokenPayload: { uid: user.id } };
    }
    async signupAndRedirectToFrontend(req, res, next) {
        const { email, password } = req.body;
        const existingUser = await this.userService.findByEmail(email);
        if (existingUser) {
            return res.redirect(consts_1.FRONTEND_PAGES.TOKEN_CONFIRMATION_FAILURE);
        }
        const hashedPassword = await bcrypt_1.default.hash(password, 10);
        const newUser = await this.userService.create({ email, password: hashedPassword });
        const token = jsonwebtoken_1.default.sign({ uid: newUser.id }, process.env.JWT_SECRET);
        return res.redirect(`${consts_1.FRONTEND_PAGES.SIGNUP_SUCCESS}/${token}`);
    }
    async sendSignupEmailConfirmation(req, res, next) {
        const { email, password } = req.body;
        const existingUser = await this.userService.findByEmail(email);
        if (existingUser) {
            res.status(400);
            return { message: 'User email already exists' };
        }
        const token = jsonwebtoken_1.default.sign({ email, password }, process.env.JWT_SECRET);
        const link = `${consts_1.BACKEND_PAGES.CONFIRM_SIGNUP}/${token}`;
        await (0, mailer_1.sendMail)({
            subject: 'Todo App Signup Confirmation',
            email,
            html: `
    <p>Follow this link to signup</p>
    <a href="${link}">${link}</a>
    `,
            text: ''
        });
        return 'Confirmation email sent';
    }
    async sendResetPasswordCodeEmail(req, res, next) {
        const { email } = req.body;
        const existingUser = await this.userService.findByEmail(email);
        if (!existingUser) {
            res.status(400);
            return { message: 'User doesnt exist' };
        }
        let newCode = '';
        for (let i = 0; i < 4; i++)
            newCode += crypto_1.default.randomInt(0, 9).toString();
        await this.userService.addPasswordResetCode(email, newCode);
        await (0, mailer_1.sendMail)({
            subject: 'Todo App Signup Confirmation',
            email,
            html: `
    <p>Enter this code to reset password. It is valid during 10 minutes</p>
    <p>${newCode}</p>
    `,
            text: ''
        });
        return 'Email with code sent';
    }
    async resetPasswordWithCode(req, res, next) {
        const { email, code, newPassword } = req.body;
        const existingUser = await this.userService.findByEmail(email);
        if (!existingUser) {
            res.status(400);
            return 'User doesnt exist';
        }
        const { passwordResetCode, passwordResetCodeExpiresAt } = existingUser;
        if (!(passwordResetCode == code || parseInt(passwordResetCodeExpiresAt) < Date.now())) {
            res.status(400);
            return 'Code invalid or has expired';
        }
        const hashedNewPassword = await bcrypt_1.default.hash(newPassword, 10);
        await this.userService.changePassword(existingUser.id, hashedNewPassword);
        return 'Password changed successfully!';
    }
    async getCurrentUser(req, res) {
        const user = Object.assign(Object.assign({}, req.user), { password: undefined, passwordResetCode: undefined, passwordResetCodeExpiresAt: undefined });
        return user;
    }
    async getCurrentUserTodos(req, res) {
        var _a;
        return ((_a = req.user) === null || _a === void 0 ? void 0 : _a.todos) || [];
    }
    async changePasswordSecure(req, res) {
        var _a;
        const { oldPassword, newPassword } = req.body;
        const isPasswordCorrect = await bcrypt_1.default.compare(oldPassword, (_a = req.user) === null || _a === void 0 ? void 0 : _a.password);
        if (!isPasswordCorrect)
            return 'Old password incorrect';
        const hashedNewPassword = await bcrypt_1.default.hash(newPassword, 10);
        await this.userService.changePassword(req.user.id, hashedNewPassword);
        return 'Password changed successfully';
    }
    async changePassword(req, res) {
        const { newPassword } = req.body;
        const hashedNewPassword = await bcrypt_1.default.hash(newPassword, 10);
        await this.userService.changePassword(req.user.id, hashedNewPassword);
        return 'Password changed successfully';
    }
}
exports.UserController = UserController;
exports.userController = new UserController(new user_service_1.default());
//# sourceMappingURL=user.controller.js.map