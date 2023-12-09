import mongoose from 'mongoose'

const transactionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    price: {
      type: String,
      required: true,
      trim: true,
      validate(value) {
        if (value.length < 2)
          throw new Error('Invalid price, must be at least 2 characters.')
      }
    },
    date: {
      type: String,
      required: true,
      trim: true
    },
    category: {
      type: String,
      required: true,
      trim: true
    }
  },
  { collection: 'transaction_list' }
)
const Transaction = mongoose.model('Transaction', transactionSchema)

export default Transaction
