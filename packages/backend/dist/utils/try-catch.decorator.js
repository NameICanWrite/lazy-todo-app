"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function isClass(v) {
    return typeof v === 'function' && /^\s*class\s+/.test(v.toString());
}
function isAsyncFunction(target) {
    return typeof target === 'function' && target.constructor.name === 'AsyncFunction';
}
function TryCatchClass(target) {
    const methodNames = Object.getOwnPropertyNames(target.prototype);
    methodNames.forEach((methodName) => {
        const originalMethod = target.prototype[methodName];
        if (!(typeof target.prototype[methodName] === 'function'))
            return;
        const isAsync = target.prototype[methodName].constructor.name === 'AsyncFunction';
        isAsync && (target.prototype[methodName] = async function (req, res, next) {
            try {
                const responseBody = await originalMethod.call(this, req, res, next);
                if (responseBody)
                    return res.send(responseBody);
            }
            catch (error) {
                console.log(`Error in ${methodName}!`);
                next(error);
            }
        });
    });
    return target;
}
function TryCatchFunction(target) {
    if (!(typeof target === 'function' && target.constructor.name === 'AsyncFunction'))
        return;
    const originalTarget = target;
    target = async function (req, res, next) {
        try {
            const responseBody = await originalTarget(req, res, next);
            if (responseBody)
                return res.send(responseBody);
        }
        catch (error) {
            console.log(`Error in ${target.name}!`);
            next(error);
        }
    };
    return target;
}
function TryCatch(target) {
    if (isClass(target))
        return TryCatchClass(target);
    if (isAsyncFunction(target))
        return TryCatchFunction(target);
}
exports.default = TryCatch;
//# sourceMappingURL=try-catch.decorator.js.map