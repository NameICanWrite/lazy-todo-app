"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../../controllers/user.controller");
const auth_middleware_1 = require("../../middlewares/auth.middleware");
const try_catch_decorator_1 = __importDefault(require("../../utils/try-catch.decorator"));
const generic_validator_1 = __importDefault(require("../../validators/generic.validator"));
const router = (0, express_1.Router)();
router.get('/secure-signup/:token', auth_middleware_1.authAndGetSignupFields, generic_validator_1.default.isBodyValidEntity('signup').bind(generic_validator_1.default), user_controller_1.userController.signupAndRedirectToFrontend.bind(user_controller_1.userController));
router.post('/send-signup-email', generic_validator_1.default.isBodyValidEntity('signup').bind(generic_validator_1.default), (0, try_catch_decorator_1.default)(user_controller_1.userController.sendSignupEmailConfirmation.bind(user_controller_1.userController)));
router.post('/login', generic_validator_1.default.isBodyValidEntity('login').bind(generic_validator_1.default), (0, auth_middleware_1.AddAuthToken)(user_controller_1.userController.login.bind(user_controller_1.userController)));
router.post('/send-password-reset-code', generic_validator_1.default.isBodyValidEntity('withEmail').bind(generic_validator_1.default), (0, try_catch_decorator_1.default)(user_controller_1.userController.sendResetPasswordCodeEmail.bind(user_controller_1.userController)));
router.post('/reset-password', generic_validator_1.default.isBodyValidEntity('resetPassword').bind(generic_validator_1.default), (0, try_catch_decorator_1.default)(user_controller_1.userController.resetPasswordWithCode.bind(user_controller_1.userController)));
router.get('/current', auth_middleware_1.authAndGetUser, (0, try_catch_decorator_1.default)(user_controller_1.userController.getCurrentUser));
router.get('/current/todos', auth_middleware_1.authAndGetUser, (0, try_catch_decorator_1.default)(user_controller_1.userController.getCurrentUserTodos));
exports.default = router;
//# sourceMappingURL=user.route.js.map