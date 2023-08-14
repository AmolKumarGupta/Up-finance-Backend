import { type Request } from 'express'
import User from '../models/User'
import { type Document } from 'mongodb'
import jwt from 'jsonwebtoken'
import TransactionController from '../controllers/Transaction'

const resolver = {
  login: async (loginInput: loginInput, req: Request) => {
    const doc: Document | null = await User.findOne({
      name: loginInput.name
    }).exec()

    if (doc == null) {
      throw new Error('User not found')
    }

    const isMatch: boolean = await doc.comparePasswordSync(loginInput.password)
    if (!isMatch) {
      throw new Error('Password do not match')
    }

    const token = jwt.sign(
      { ...doc._doc, _id: doc._id.toString() },
      process.env.SECRET_KEY,
      { expiresIn: '1h' }
    )

    return token
  },

  signup: async (signUpInput: signUpInput, req: Request) => {
    const existingUser: Document | null = await User.findOne({
      $or: [
        { name: signUpInput.name },
        { email: signUpInput.email }
      ]
    }).exec()

    if (existingUser != null) {
      throw new Error('name or email is already existed')
    }

    const user = new User(signUpInput)
    const doc: Document | null = await user.save()
    const token = jwt.sign({ ...doc._doc, _id: doc._id.toString() }, process.env.SECRET_KEY, { expiresIn: '1h' })
    return token
  },

  transactions: TransactionController.all,
  transaction_create: TransactionController.create,
  transaction_delete: TransactionController.delete
}

export default resolver
