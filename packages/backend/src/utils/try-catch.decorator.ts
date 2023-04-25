import { NextFunction, Request, Response } from "express";

export default function TryCatch(target: any) {
  const methodNames = Object.getOwnPropertyNames(target.prototype);
  methodNames.forEach((methodName) => {
    const originalMethod = target.prototype[methodName];
    if (!(typeof target.prototype[methodName] === 'function')) return

    target.prototype[methodName] = async function (req: Request, res: Response, next: NextFunction) {
      try {
        return await originalMethod.call(this, req, res, next);
      } catch (error) {
        console.log(`Error in ${methodName}!`);
        next(error);
      }
    };
  });

  // Return the modified class
  return target;
}

// export function TryCatch(target: any) {
//   const { prototype } = target;

//   Object.getOwnPropertyNames(prototype).forEach((key) => {
//     const property = prototype[key];

//     if (typeof property === 'function') {
//       const method = property;

//       // eslint-disable-next-line func-names
//       prototype[key] = async function (req: Request, res: Response, next: NextFunction) {
//         try {
//           await method.call(this, req, res, next);
//         } catch (err) {
//           next(err);
//         }
//       };
//     }
//   });

//   return target;
// }


