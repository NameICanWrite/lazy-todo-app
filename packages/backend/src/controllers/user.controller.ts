import { Request, Response, NextFunction } from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import {User} from '../entities/User';
import UserService from '../services/user.service';
import bcrypt from 'bcrypt'
import TryCatch from '../utils/try-catch.decorator';
import { AddAuthToken, addJwtHeader } from '../middlewares/auth.middleware';
import { BACKEND_PAGES, FRONTEND_PAGES } from '../consts';
import { sendMail } from '../config/mailer';
import crypto from 'crypto'


export class UserController {
  constructor(private userService: UserService) {}


  async signup(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body;
    const existingUser = await this.userService.findByEmail(email);
    if (existingUser) {
      res.status(400)
      return {message: 'User email already exists'}
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await this.userService.create({email, password: hashedPassword})
    
    return {message: 'Signed up successfully!', tokenPayload: {uid: newUser.id}}
  }

  async login(req: Request<any, any, {email: string, password: string}>, res: Response, next: NextFunction) {
    const { email, password } = req.body;
    const user = await this.userService.findByEmail(email);
    if (!user) {
      res.status(401)
      return {message: 'User doesnt exist'}
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password)
    if (!isPasswordCorrect) {
      res.status(401)
      return {message: 'Password incorrect'}
    }
    return {message: user, tokenPayload: {uid: user.id} }
  }

  async signupAndRedirectToFrontend(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body;
    const existingUser = await this.userService.findByEmail(email);
    if (existingUser) {
      return res.redirect(FRONTEND_PAGES.TOKEN_CONFIRMATION_FAILURE)
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await this.userService.create({email, password: hashedPassword})
    const token = jwt.sign({uid: newUser.id}, process.env.JWT_SECRET)
    
    return res.redirect(`${FRONTEND_PAGES.SIGNUP_SUCCESS}/${token}`)
  }

  async sendSignupEmailConfirmation(req: Request, res: Response, next: NextFunction) {
    const {email, password} = req.body
    const existingUser = await this.userService.findByEmail(email);
    if (existingUser) {
      res.status(400)
      return {message: 'User email already exists'}
    }
    const token = jwt.sign({email, password}, process.env.JWT_SECRET)
    const link = `${BACKEND_PAGES.CONFIRM_SIGNUP}/${token}`
    await sendMail({
      subject: 'Todo App Signup Confirmation', 
      email, 
      html: `
    <p>Follow this link to signup</p>
    <a href="${link}">${link}</a>
    `,
      text: ''
    })
    return 'Confirmation email sent'
  }

  async sendResetPasswordCodeEmail(req: Request, res: Response, next: NextFunction) {
    const { email } = req.body
    const existingUser = await this.userService.findByEmail(email);
    if (!existingUser) {
      res.status(400)
      return {message: 'User doesnt exist'}
    }
    let newCode = ''
    for (let i = 0 ; i < 4; i++) newCode += crypto.randomInt(0, 9).toString()
    await this.userService.addPasswordResetCode(email, newCode)
    await sendMail({
      subject: 'Todo App Signup Confirmation', 
      email, 
      html: `
    <p>Enter this code to reset password. It is valid during 10 minutes</p>
    <p>${newCode}</p>
    `,
      text: ''
    })
    return 'Email with code sent'
  }

  async resetPasswordWithCode(req: Request<any, any, {email: string, code: string, newPassword: string}>, res: Response, next: NextFunction) {
    const {email, code, newPassword } = req.body
    
    const existingUser = await this.userService.findByEmail(email);
    if (!existingUser) {
      res.status(400)
      return 'User doesnt exist'
    }
    const {passwordResetCode, passwordResetCodeExpiresAt} = existingUser
    if (!(passwordResetCode == code || parseInt(passwordResetCodeExpiresAt) < Date.now())) {
      res.status(400)
      return 'Code invalid or has expired'
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 10)
    await this.userService.changePassword((existingUser as User).id, hashedNewPassword)

    return 'Password changed successfully!'
  }

  
  async getCurrentUser(req: Request & {user: User}, res: Response) {
    const user = {...req.user, password: undefined, passwordResetCode: undefined, passwordResetCodeExpiresAt: undefined}
    return user
  }

  async getCurrentUserTodos(req: Request & {user: User}, res: Response) {
    return (req.user as User)?.todos || []
  }

  async changePasswordSecure(req: Request<any, any, {oldPassword:string, newPassword: string}> & {user: User}, res: Response) {
    const {oldPassword, newPassword} = req.body
    const isPasswordCorrect = await bcrypt.compare(oldPassword, (req.user as User)?.password)
    if (!isPasswordCorrect) return 'Old password incorrect'

    const hashedNewPassword = await bcrypt.hash(newPassword, 10)
    await this.userService.changePassword((req.user as User).id, hashedNewPassword)
    return 'Password changed successfully'
  }

  async changePassword(req: Request<any, any, {newPassword: string}> & {user: User}, res: Response) {
    const {newPassword} = req.body
    const hashedNewPassword = await bcrypt.hash(newPassword, 10)
    await this.userService.changePassword((req.user as User).id, hashedNewPassword)
    return 'Password changed successfully'
  }

}

export const userController = new UserController(new UserService())