"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BACKEND_PAGES = exports.FRONTEND_PAGES = exports.entityTypes = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.entityTypes = {
    USER: 'user',
    TODOS: 'todos'
};
exports.FRONTEND_PAGES = {
    TOKEN_CONFIRMATION_FAILURE: `${process.env.CLIENT_ROOT_URL}/token-is-wrong`,
    SIGNUP_SUCCESS: `${process.env.CLIENT_ROOT_URL}/signup-success`
};
exports.BACKEND_PAGES = {
    CONFIRM_SIGNUP: `${process.env.ROOT_URL}/api/user/secure-signup`
};
//# sourceMappingURL=consts.js.map