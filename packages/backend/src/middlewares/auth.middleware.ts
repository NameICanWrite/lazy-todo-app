import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt, VerifiedCallback } from 'passport-jwt';
import { IUser } from '../types/user.type';
import TryCatch from '../utils/try-catch.decorator';
import UserService from '../services/user.service';
import { IJwtAuthPayload } from '../types/user.type';
import { User } from '../entities/User';
import dotenv from 'dotenv'

dotenv.config()

const userService = new UserService()

const extractorFromTokenParam = (req: Request) => {
  let token = null;
  if (req && req.params.token) {
      token = req.params.token;
  }
    return token;
}

export const passportOptions = {
  jwtFromRequest: ExtractJwt.fromExtractors([ExtractJwt.fromAuthHeaderWithScheme('JWT'), extractorFromTokenParam]),
  secretOrKey: process.env.JWT_SECRET
};

export const passportJwtStrategy= new JwtStrategy(passportOptions, async ({uid}: IJwtAuthPayload, done: VerifiedCallback) => {

  try {
      const user = await userService.findById(uid);
  if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    } catch (error) {
      return done(error, false);
    }
})



passport.use('jwt',passportJwtStrategy);


export const authAndGetUser = TryCatch(async (req: Request, res: Response, next: NextFunction) => {
  let errMessage
  await new Promise((resolve, reject) => passport.authenticate('jwt', { session: false }, (err: any, user: User) => {
    if (err || !user) {
      res.status(401)
      errMessage = 'You should login first!'
      console.log('errored');
      return resolve(1)
    }
    req.user = user
    return resolve(1)
  })(req, res, next))

  return errMessage || next()
})

export const optionalAuthAndGetUser = TryCatch(async (req: Request, res: Response, next: NextFunction) => {
  await new Promise(resolve => passport.authenticate('jwt', { session: false }, (err: any, user: User) => {
    req.user = user || null
    resolve(1)
  })(req, res, next))
  next()
})


export function AddAuthToken(callback: any): (req: Request, res: Response, next: NextFunction) => Promise<string> {
  return TryCatch(
    async function (req: Request, res: Response, next: NextFunction) {
      const { message, tokenPayload } = await callback(req, res, next)
      console.log(message, tokenPayload);
      if (tokenPayload) {
        const token = jwt.sign({ ...tokenPayload }, process.env.JWT_SECRET)
        res.header('Authorization', `JWT ${token}`)
      }
      return message
    }
  )
}