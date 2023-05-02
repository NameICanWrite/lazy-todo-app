export const sendConfirmationLinkByEmail = ({link, description}: {link: string, description: string}) =>  TryCatch(async (req: Request, res: Response, next: NextFunction) => {
  const email = req.params.email
  next()
})