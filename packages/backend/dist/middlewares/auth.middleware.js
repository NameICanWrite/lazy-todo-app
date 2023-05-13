"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addJwtHeader = exports.AddAuthToken = exports.optionalAuthAndGetUser = exports.authAndGetSignupFields = exports.authAndGetUser = exports.passportJwtStrategySignup = exports.passportJwtStrategyLogin = exports.passportOptionsSignup = exports.passportOptionsLogin = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const passport_1 = __importDefault(require("passport"));
const passport_jwt_1 = require("passport-jwt");
const try_catch_decorator_1 = __importDefault(require("../utils/try-catch.decorator"));
const user_service_1 = __importDefault(require("../services/user.service"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const userService = new user_service_1.default();
const extractorFromTokenParam = (req) => {
    let token = null;
    if (req && req.params.token) {
        token = req.params.token;
    }
    return token;
};
exports.passportOptionsLogin = {
    jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderWithScheme('JWT'), extractorFromTokenParam,
    secretOrKey: process.env.JWT_SECRET
};
exports.passportOptionsSignup = {
    jwtFromRequest: extractorFromTokenParam,
    secretOrKey: process.env.JWT_SECRET
};
exports.passportJwtStrategyLogin = new passport_jwt_1.Strategy(exports.passportOptionsLogin, async ({ uid }, done) => {
    try {
        const user = await userService.findById(uid);
        if (user) {
            return done(null, user);
        }
        else {
            return done(null, false);
        }
    }
    catch (error) {
        return done(error, false);
    }
});
exports.passportJwtStrategySignup = new passport_jwt_1.Strategy(exports.passportOptionsSignup, async (signupFields, done) => {
    done(null, signupFields);
});
passport_1.default.use('jwt-login', exports.passportJwtStrategyLogin);
passport_1.default.use('jwt-signup', exports.passportJwtStrategySignup);
exports.authAndGetUser = (0, try_catch_decorator_1.default)(async (req, res, next) => {
    let errMessage;
    await new Promise((resolve, reject) => passport_1.default.authenticate('jwt-login', { session: false }, (err, user) => {
        if (err || !user) {
            res.status(401);
            errMessage = 'You should login first!';
            console.log('errored');
            return resolve(1);
        }
        req.user = user;
        return resolve(1);
    })(req, res, next));
    return errMessage || next();
});
exports.authAndGetSignupFields = (0, try_catch_decorator_1.default)(async (req, res, next) => {
    passport_1.default.authenticate(exports.passportJwtStrategySignup, { session: false }, (err, signupFields) => {
        req.body = signupFields;
        console.log(req.body);
    })(req, res, next);
    next();
});
exports.optionalAuthAndGetUser = (0, try_catch_decorator_1.default)(async (req, res, next) => {
    await new Promise(resolve => passport_1.default.authenticate('jwt-login', { session: false }, (err, user) => {
        req.user = user || null;
        resolve(1);
    })(req, res, next));
    next();
});
function AddAuthToken(callback) {
    return (0, try_catch_decorator_1.default)(async function (req, res, next) {
        const { message, tokenPayload } = await callback(req, res, next);
        if (tokenPayload) {
            addJwtHeader(res, tokenPayload);
        }
        return message;
    });
}
exports.AddAuthToken = AddAuthToken;
function addJwtHeader(res, payload) {
    const token = jsonwebtoken_1.default.sign(Object.assign({}, payload), process.env.JWT_SECRET);
    res.header('Authorization', `JWT ${token}`);
}
exports.addJwtHeader = addJwtHeader;
//# sourceMappingURL=auth.middleware.js.map