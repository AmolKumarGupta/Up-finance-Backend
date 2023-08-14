import { type NextFunction, type Request, type Response } from 'express'
import { validationResult, body } from 'express-validator'
import User from '../models/User'
import { type Document } from 'mongodb'
import jwt from 'jsonwebtoken'
import { type IRequest } from '../interfaces/myExpress'

export default class Auth {
  public get (): Auth {
    return this
  }

  public static signup = [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Invalid email'),
    body('password').isLength({ min: 6 }).withMessage('Password must have at least 6 characters'),

    (req: Request, res: Response, next: NextFunction): void => {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() })
      }

      const user = new User({ ...req.body })
      user
        .save()
        .then((doc: Document) => {
          const token = jwt.sign({ ...doc._doc, _id: doc._id.toString() }, process.env.SECRET_KEY, { expiresIn: '1h' })
          res.json({
            token
          })
        })
        .catch((err: Error) => {
          next(err)
        })
    }
  ]

  public static login = [
    body('name').notEmpty().withMessage('Name is required'),
    body('password').notEmpty().withMessage('Password is required'),

    (req: IRequest, res: Response, next: NextFunction): void => {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() })
      }

      User.findOne({
        name: req.body.name
      })
        .exec()
        .then((doc: Document | null) => {
          if (doc == null) {
            res.status(400).json({ err: 'User not found' })
          } else {
            doc.comparePassword(req.body.password, (err: Error | null, isMatch: boolean) => {
              if (err != null) {
                next(err)
              } else if (!isMatch) {
                res.status(400).json({ err: 'Incorrect password' })
              } else {
                const token = jwt.sign(
                  { ...doc._doc, _id: doc._id.toString() },
                  process.env.SECRET_KEY,
                  { expiresIn: '1h' }
                )

                res.json({
                  token
                })
              }
            })
          }
        })
        .catch((err: Error) => {
          next(err)
        })
    }
  ]
}
