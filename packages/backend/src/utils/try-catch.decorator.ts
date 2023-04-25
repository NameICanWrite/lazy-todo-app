import { NextFunction, Request, Response } from "express";

export default function TryCatch(target: any) {
  
  // Get all method names of the class
  const methodNames = Object.getOwnPropertyNames(target.prototype);

  // Loop through all method names
  methodNames.forEach((methodName) => {
    // Get the original method implementation
    const originalMethod = target.prototype[methodName];
    if (!(typeof target.prototype[methodName] === 'function')) return

    // Create a new method implementation that wraps the original method in a try-catch block
    target.prototype[methodName] = async function (req: Request, res: Response, next: NextFunction) {
      try {
        // Call the original method with the given arguments
        return await originalMethod.call(this, req, res, next);
      } catch (error) {
        console.log(`Error in ${methodName}!`);
        next(error)
        // Handle the error as necessary
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


