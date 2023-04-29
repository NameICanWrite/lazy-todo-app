import { Router, Request, Response } from 'express';
import { userController } from '../../controllers/user.controller';
import { AddAuthToken, authAndGetUser } from '../../middlewares/auth.middleware';
import TryCatch from '../../utils/try-catch.decorator';

const router: Router = Router();

// @route   POST api/user
// @desc    Register user given their email and password, returns the token upon successful registration
// @access  Public
router.post('/signup', AddAuthToken(userController.signup.bind(userController)));
router.post('/login', AddAuthToken(userController.login.bind(userController)))
router.get('/current', authAndGetUser, TryCatch(userController.getCurrentUser))
router.post('/change-password-secure', authAndGetUser, TryCatch(userController.changePasswordSecure.bind(userController)))
router.post('/change-password', authAndGetUser, TryCatch(userController.changePassword.bind(userController)))
export default router;
