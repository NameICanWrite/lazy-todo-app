import { Request, Response, NextFunction } from 'express';
import { Strategy as JwtStrategy } from 'passport-jwt';
export declare const passportOptionsLogin: {
    jwtFromRequest: import("passport-jwt").JwtFromRequestFunction;
    extractorFromTokenParam: (req: Request) => string | null;
    secretOrKey: string;
};
export declare const passportOptionsSignup: {
    jwtFromRequest: (req: Request) => string | null;
    secretOrKey: string;
};
export declare const passportJwtStrategyLogin: JwtStrategy;
export declare const passportJwtStrategySignup: JwtStrategy;
export declare const authAndGetUser: Function | undefined;
export declare const authAndGetSignupFields: Function | undefined;
export declare const optionalAuthAndGetUser: Function | undefined;
export declare function AddAuthToken(callback: any): (req: Request, res: Response, next: NextFunction) => Promise<string>;
export declare function addJwtHeader(res: Response, payload: Object): void;
