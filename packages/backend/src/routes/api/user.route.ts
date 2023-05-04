import { Router, Request, Response } from 'express';
import { userController } from '../../controllers/user.controller';
import { AddAuthToken, authAndGetSignupFields, authAndGetUser } from '../../middlewares/auth.middleware';
import TryCatch from '../../utils/try-catch.decorator';
import validator from '../../validators/generic.validator';

const router: Router = Router();

// @route   POST api/user
// @desc    Register user given their email and password, returns the token upon successful registration
// @access  Public
// router.post('/signup', AddAuthToken(userController.signup.bind(userController)));

//login-signup functionality
router.get('/secure-signup/:token', 
  authAndGetSignupFields,
  validator.isBodyValidEntity('signup').bind(validator),
  userController.signupAndRedirectToFrontend.bind(userController)
);
router.post('/send-signup-email', 
  validator.isBodyValidEntity('signup').bind(validator),
  TryCatch(userController.sendSignupEmailConfirmation.bind(userController))
)
router.post('/login', 
  validator.isBodyValidEntity('login').bind(validator),
  AddAuthToken(userController.login.bind(userController))
)

//edit user functionality
router.post('/send-password-reset-code', 
  validator.isBodyValidEntity('withEmail').bind(validator),
  TryCatch(userController.sendResetPasswordCodeEmail.bind(userController))
)

router.post('/reset-password', 
  validator.isBodyValidEntity('resetPassword').bind(validator),
  TryCatch(userController.resetPasswordWithCode.bind(userController))
)

//fetch functionality
router.get('/current', authAndGetUser, TryCatch(userController.getCurrentUser))
router.get('/current/todos', authAndGetUser, TryCatch(userController.getCurrentUserTodos))


// router.post('/change-password-secure', authAndGetUser, TryCatch(userController.changePasswordSecure.bind(userController)))
// router.post('/change-password', authAndGetUser, TryCatch(userController.changePassword.bind(userController)))
export default router;
