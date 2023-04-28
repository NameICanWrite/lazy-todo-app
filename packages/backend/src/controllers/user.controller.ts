import { Request, Response, NextFunction } from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import { ExtractJwt, Strategy as JwtStrategy } from 'passport-jwt';
import {User} from '../entities/User';

interface UserPayload {
  id: string;
  email: string;
  iat: number;
  exp: number;
}

class AuthController {
  public static async signup(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body;
    try {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'Email already exists' });
      }
      const newUser = new User({ email });
      const hashedPassword = await bcrypt.hash(password, 10);
      newUser.password = hashedPassword;
      await newUser.save();
      const token = jwt.sign({ id: newUser._id, email: newUser.email }, process.env.JWT_SECRET);
      return res.status(201).header('Authorization', `Bearer ${token}`).json({ token });
    } catch (error) {
      return next(error);
    }
  }

  public static async login(req: Request, res: Response, next: NextFunction) {
    passport.authenticate('local', { session: false }, (err, user, info) => {
      if (err || !user) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
      req.login(user, { session: false }, (err) => {
        if (err) {
          return next(err);
        }
        const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET);
        return res.status(200).header('Authorization', `Bearer ${token}`).json({ token });
      });
    })(req, res, next);
  }

  public static initialize() {
    const opts = {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET
    };
    passport.use(
      new JwtStrategy(opts, async (jwt_payload: UserPayload, done: any) => {
        try {
          const user = await User.findById(jwt_payload.id);
          if (user) {
            return done(null, user);
          } else {
            return done(null, false);
          }
        } catch (error) {
          return done(error, false);
        }
      })
    );
  }
}

export default AuthController;