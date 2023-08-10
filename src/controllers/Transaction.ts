
export default class Transaction {
  public get (): Transaction {
    return this
  }

  public static async create (input: transactionInput, req: Request): Promise<unknown> {
    console.log({ input, req })
    return 1
  }
}
