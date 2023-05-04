import { type NextFunction, type Request, type Response } from 'express'
import User from '../models/User'
import Logger from '../utils/Logger'
import { type Document } from 'mongodb'
import jwt from 'jsonwebtoken'
import { type IRequest } from '../interfaces/myExpress'

export default class Auth {
  public get (): Auth {
    return this
  }

  public static signup (req: Request, res: Response, next: NextFunction): void {
    const user = new User({ ...req.body })
    user
      .save()
      .then((doc: Document) => {
        const token = jwt.sign({ ...doc._doc, _id: doc._id.toString() }, process.env.SECRET_KEY, { expiresIn: '1h' })
        return res.json({
          token
        })
      })
      .catch((err: Error) => {
        Logger.error(err.message)
        return res.status(500).json({
          err: err.message
        })
      })
  }

  public static login (req: IRequest, res: Response, next: NextFunction): void {
    User.findOne({
      name: req.body.name
    })
    .exec()
    .then((doc: Document|null) => {
      if (!doc) {
        return res.status(400).json({ err: "user not found" });
      }

      doc.comparePassword(req.body.password, (err: Error|null, isMatch: boolean) => {
        if (err) {
          return next(err)
        }

        if (! isMatch) {
          return res.status(400).json({ err: "incorrect password" })
        }
        
        const token = jwt.sign(
          { ...doc._doc, _id: doc._id.toString() }, 
          process.env.SECRET_KEY, 
          { expiresIn: '1h' }
        )

        return res.json({
          token
        })
      })
    })
  }
}
