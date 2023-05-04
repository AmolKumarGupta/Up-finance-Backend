import { type NextFunction, type Response } from 'express'
import jwt from 'jsonwebtoken'
import { type IRequest } from '../interfaces/myExpress'

export default function auth (req: IRequest, res: Response, next: NextFunction): Response | void {
  const authHeader = req.headers.authorization
  const token = authHeader?.split(' ')[1]

  if (token == null) {
    req.isAuth = false
    return res.status(401).json({ err: "token not found" })
  }

  jwt.verify(token, process.env.SECRET_KEY as string, (err: Error | null, user: object) => {
    if (err != null) {
      return res.status(401).json({ err })
    }

    req.isAuth = true
    req.user = user
    next()
  })
}
