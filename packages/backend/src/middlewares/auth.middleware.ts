import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt, VerifiedCallback } from 'passport-jwt';
import { ISignupFields, IUser } from '../types/user.type';
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

export const passportOptionsLogin = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('JWT'), extractorFromTokenParam,
  secretOrKey: process.env.JWT_SECRET
};

export const passportOptionsSignup = {
  jwtFromRequest: extractorFromTokenParam,
  secretOrKey: process.env.JWT_SECRET
};

export const passportJwtStrategyLogin= new JwtStrategy(passportOptionsLogin, async ({uid}: IJwtAuthPayload, done: VerifiedCallback) => {

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

export const passportJwtStrategySignup = new JwtStrategy(passportOptionsSignup, async (signupFields: IJwtAuthPayload, done: VerifiedCallback) => {
  done(null, signupFields)
})



passport.use('jwt-login', passportJwtStrategyLogin);
passport.use('jwt-signup', passportJwtStrategySignup)


export const authAndGetUser = TryCatch(async (req: Request, res: Response, next: NextFunction) => {
  let errMessage
  await new Promise((resolve, reject) => passport.authenticate('jwt-login', { session: false }, (err: any, user: User) => {
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

export const authAndGetSignupFields = TryCatch(async (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate(passportJwtStrategySignup, { session: false }, (err: any, signupFields: ISignupFields) => {
    req.body = signupFields
    console.log(req.body);
  })(req, res, next)
  next()
})


export const optionalAuthAndGetUser = TryCatch(async (req: Request, res: Response, next: NextFunction) => {
  await new Promise(resolve => passport.authenticate('jwt-login', { session: false }, (err: any, user: User) => {
    req.user = user || null
    resolve(1)
  })(req, res, next))
  next()
})


export function AddAuthToken(callback: any): (req: Request, res: Response, next: NextFunction) => Promise<string> {
  return TryCatch(
    async function (req: Request, res: Response, next: NextFunction) {
      const { message, tokenPayload } = await callback(req, res, next)
      if (tokenPayload) {
        addJwtHeader(res, tokenPayload)
      }
      return message
    }
  )
}

export function addJwtHeader(res: Response, payload: Object) {
  const token = jwt.sign({ ...payload }, process.env.JWT_SECRET)
  res.header('Authorization', `JWT ${token}`)
}