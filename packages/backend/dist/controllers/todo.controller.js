"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoController = void 0;
const todo_service_1 = __importDefault(require("../services/todo.service"));
const try_catch_decorator_1 = __importDefault(require("../utils/try-catch.decorator"));
let TodoController = class TodoController {
    constructor(todoService) {
        this.todoService = todoService;
    }
    async getAllVisibleTodosAndFilter(req, res, next) {
        var _a;
        let { status, search, fromIndex, toIndex } = req.query;
        return await this.todoService.findAll({
            status, search, fromIndex: parseInt(fromIndex), toIndex: parseInt(toIndex), userId: (_a = req.user) === null || _a === void 0 ? void 0 : _a.id
        });
    }
    async createTodo(req) {
        const todo = await this.todoService.create(req.body, req.user);
        return todo;
    }
    async getOneTodo(req, res) {
        var _a;
        const todo = await this.todoService.findById(req.params.id);
        const isOwner = (_a = req.user) === null || _a === void 0 ? void 0 : _a.todos.some(todo => todo.id == req.params.id);
        if ((todo === null || todo === void 0 ? void 0 : todo.isPrivate) && !isOwner) {
            res.status(404);
            return 'Todo Not Found';
        }
        return todo;
    }
    async deleteTodo(req, res) {
        await this.todoService.delete(req.params.id);
        return 'Todo deleted';
    }
    async editTodo(req, res) {
        const todo = req.body;
        await this.todoService.edit(req.params.id, todo);
        return 'Todo updated';
    }
    async completeTodo(req, res) {
        const todo = req.body;
        await this.todoService.complete(req.params.id);
        return 'Todo completed';
    }
};
TodoController = __decorate([
    try_catch_decorator_1.default,
    __metadata("design:paramtypes", [todo_service_1.default])
], TodoController);
exports.TodoController = TodoController;
const todoController = new TodoController(new todo_service_1.default());
exports.default = todoController;
//# sourceMappingURL=todo.controller.js.map