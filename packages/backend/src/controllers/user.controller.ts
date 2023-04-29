import { Request, Response, NextFunction } from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import {User} from '../entities/User';
import UserService from '../services/user.service';
import bcrypt from 'bcrypt'
import TryCatch from '../utils/try-catch.decorator';
import { AddAuthToken } from '../middlewares/auth.middleware';


export class UserController {
  constructor(private userService: UserService) {}

  // @AddAuthToken
  async signup(req: Request, res: Response, next: NextFunction) {
    const { name, password } = req.body;
    const existingUser = await this.userService.findByName(name);
    if (existingUser) {
      res.status(400)
      return {message: 'Username already exists'}
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await this.userService.create({name, password: hashedPassword})
    
    return {message: 'Signed up successfully!', tokenPayload: {uid: newUser.id}}
  }

  // @AddAuthToken
  async login(req: Request<any, any, {name: string, password: string}>, res: Response, next: NextFunction) {
    const { name, password } = req.body;
    const user = await this.userService.findByName(name);
    if (!user) {
      res.status(401)
      return {message: 'Username invalid'}
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password)
    if (!isPasswordCorrect) {
      res.status(401)
      return {message: 'Password incorrect'}
    }
    return {message: 'Logged in successfully', tokenPayload: {uid: user.id}}
  }

  async getCurrentUser(req: Request, res: Response) {
    return req.user
  }

  async getCurrentUserTodos(req: Request, res: Response) {
    return (req.user as User)?.todos || []
  }

  async changePasswordSecure(req: Request<any, any, {oldPassword:string, newPassword: string}>, res: Response) {
    const {oldPassword, newPassword} = req.body
    const isPasswordCorrect = await bcrypt.compare(oldPassword, (req.user as User)?.password)
    if (!isPasswordCorrect) return 'Old password incorrect'

    const hashedNewPassword = await bcrypt.hash(newPassword, 10)
    await this.userService.changePassword((req.user as User).id, hashedNewPassword)
    return 'Password changed successfully'
  }

  async changePassword(req: Request<any, any, {newPassword: string}>, res: Response) {
    const {newPassword} = req.body
    const hashedNewPassword = await bcrypt.hash(newPassword, 10)
    await this.userService.changePassword((req.user as User).id, hashedNewPassword)
    return 'Password changed successfully'
  }

}

export const userController = new UserController(new UserService())