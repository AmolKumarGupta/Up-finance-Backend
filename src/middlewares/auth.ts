import { type NextFunction, type Response } from 'express'
import jwt from 'jsonwebtoken'
import { type IRequest } from '../interfaces/myExpress'

export default function auth (req: IRequest, res: Response, next: NextFunction): void {
  const authHeader = req.headers.authorization
  const token = authHeader?.split(' ')[1]

  if (token == null) {
    req.isAuth = false
    next()
  }

  jwt.verify(token, process.env.SECRET_KEY as string, (err: Error | null, user: object) => {
    if (err != null) {
      next(err); return
    }

    req.isAuth = true
    req.user = user
    next()
  })
}
