import {NextFunction, Request, Response} from 'express'

function isClass(v: Function) {
    return typeof v === 'function' && /^\s*class\s+/.test(v.toString())
}

function isAsyncFunction(target: Function) {
    return typeof target === 'function' && target.constructor.name === 'AsyncFunction'
}

function TryCatchClass(target: Function) {
    const methodNames = Object.getOwnPropertyNames(target.prototype)
    methodNames.forEach((methodName) => {
        const originalMethod = target.prototype[methodName]
        if (!(typeof target.prototype[methodName] === 'function')) return
        const isAsync = target.prototype[methodName].constructor.name === 'AsyncFunction'

        isAsync && (target.prototype[methodName] = async function (req: Request, res: Response, next: NextFunction) {
            try {
                const responseBody = await originalMethod.call(this, req, res, next)
                if (responseBody) return res.send(responseBody)
            } catch (error) {
                console.log(`Error in ${methodName}!`)
                next(error)
            }
        })
    })
    // Return the modified class
    return target
}

function TryCatchFunction(target: Function) {
    if (!(typeof target === 'function' && target.constructor.name === 'AsyncFunction')) return
    const originalTarget = target
    target = async function (req: Request, res: Response, next: NextFunction) {
        try {
            const responseBody = await originalTarget(req, res, next)
            if (responseBody) return res.send(responseBody)
        } catch (error) {
            console.log(`Error in ${target.name}!`)
            next(error)
        }
    }

    // Return the modified class
    return target
}

export default function TryCatch(target: Function) {
    if (isClass(target)) return TryCatchClass(target)
    if (isAsyncFunction(target)) return TryCatchFunction(target)
}


