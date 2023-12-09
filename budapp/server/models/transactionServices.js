/* eslint-disable require-jsdoc */
import mongoose from 'mongoose'
import TransactionModel from './transaction.js'
import CustomerModel from './customer.js'
import { ObjectId } from 'mongodb'

mongoose.set('debug', true)
// const connectionString = `mongodb://localhost:27017/mongo`

async function addTransaction(transaction, customerId) {
  try {
    const transactionToAdd = new TransactionModel(transaction)
    const objectId = new ObjectId(customerId)
    const result = await CustomerModel.findOneAndUpdate(
      { _id: objectId },
      { $push: { transaction_list: transactionToAdd } },
      { new: true }
    )
    return result
  } catch (error) {
    console.error('Error adding transaction:', error)
    throw error
  }
}

async function getTransactions(customerId) {
  try {
    const objectId = new ObjectId(customerId)
    const transactions = await CustomerModel.find({ _id: objectId })

    return transactions
  } catch (error) {
    console.error('Error getting transactions:', error)
    throw error
  }
}

export default {
  addTransaction,
  getTransactions
}
