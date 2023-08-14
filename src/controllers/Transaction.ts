import { type Document } from 'mongoose'
import Transaction from '../models/Transaction'

export default class TransactionController {
  public get (): TransactionController {
    return this
  }

  public static async all (req: Request): Promise<unknown> {
    return await Transaction.find({})
  }

  public static async create (input: transactionInput, req: Request): Promise<unknown> {
    const transaction = new Transaction({
      name: input.name,
      type: input.type,
      amount: input.amount
    })

    const doc: Document = await transaction.save()
    return doc._id.toString()
  }

  public static async delete (input: { id: string }, req: Request): Promise<boolean> {
    if (input.id === '') {
      return false
    }
    const result = Transaction.deleteOne({ _id: input.id })

    return await result.then((records) => {
      return true
    // eslint-disable-next-line n/handle-callback-err
    }).catch((err) => {
      return false
    })
  }
}
