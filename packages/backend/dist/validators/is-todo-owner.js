"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isTodoOwner = void 0;
const try_catch_decorator_1 = __importDefault(require("../utils/try-catch.decorator"));
exports.isTodoOwner = (0, try_catch_decorator_1.default)(async function (req, res, next) {
    var _a;
    if ((_a = req.user) === null || _a === void 0 ? void 0 : _a.todos.some(todo => todo.id == req.params.id)) {
        return next();
    }
    res.status(400);
    return 'You don\'t own this todo';
});
//# sourceMappingURL=is-todo-owner.js.map