import mongoose, { Schema } from 'mongoose'

const TransactionSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true,
    default: 'expense'
  },
  amount: {
    type: Number,
    required: true
  }
}, {
  timestamps: true
})

export default mongoose.model('Transaction', TransactionSchema)
