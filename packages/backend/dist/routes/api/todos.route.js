"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const todo_controller_1 = __importDefault(require("../../controllers/todo.controller"));
const generic_validator_1 = __importDefault(require("../../validators/generic.validator"));
const Todo_1 = require("../../entities/Todo");
const auth_middleware_1 = require("../../middlewares/auth.middleware");
const is_todo_owner_1 = require("../../validators/is-todo-owner");
const todosRouter = (0, express_1.Router)();
todosRouter.get('/', auth_middleware_1.optionalAuthAndGetUser, todo_controller_1.default.getAllVisibleTodosAndFilter.bind(todo_controller_1.default));
todosRouter.post('/', auth_middleware_1.authAndGetUser, generic_validator_1.default.isBodyValidEntity.bind(generic_validator_1.default)(Todo_1.Todo), todo_controller_1.default.createTodo.bind(todo_controller_1.default));
todosRouter.get('/complete/:id', auth_middleware_1.authAndGetUser, generic_validator_1.default.isEntityExistsById.bind(generic_validator_1.default)(Todo_1.Todo), is_todo_owner_1.isTodoOwner, todo_controller_1.default.completeTodo.bind(todo_controller_1.default));
todosRouter.put('/:id', auth_middleware_1.authAndGetUser, generic_validator_1.default.isBodyValidEntity.bind(generic_validator_1.default)(Todo_1.Todo), generic_validator_1.default.isEntityExistsById.bind(generic_validator_1.default)(Todo_1.Todo), is_todo_owner_1.isTodoOwner, todo_controller_1.default.editTodo.bind(todo_controller_1.default));
todosRouter.get('/one/:id', auth_middleware_1.optionalAuthAndGetUser, generic_validator_1.default.isEntityExistsById.bind(generic_validator_1.default)(Todo_1.Todo), todo_controller_1.default.getOneTodo.bind(todo_controller_1.default));
todosRouter.delete('/:id', auth_middleware_1.authAndGetUser, generic_validator_1.default.isEntityExistsById.bind(generic_validator_1.default)(Todo_1.Todo), is_todo_owner_1.isTodoOwner, todo_controller_1.default.deleteTodo.bind(todo_controller_1.default));
exports.default = todosRouter;
//# sourceMappingURL=todos.route.js.map