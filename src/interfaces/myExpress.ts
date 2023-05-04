import { type Request } from 'express'

export interface IRequest extends Request {
  isAuth: boolean
  user?: object
}
