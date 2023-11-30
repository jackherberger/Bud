/* eslint-disable require-jsdoc */
import mongoose from "mongoose"
import TransactionModel from "./transaction.js"

mongoose.set("debug", true)
const connectionString = `mongodb://localhost:27017/mongo`



async function addTransaction(transaction) {
  try {
    const transactionToAdd = new TransactionModel(transaction)
    const result = await transactionToAdd.save()
    return result
  } catch (error) {
    console.error("Error adding transaction:", error)
    throw error
  }
}

async function getTransactions() {
  try {
    const transactions = await TransactionModel.find()
    return transactions
  } catch (error) {
    console.error("Error getting transactions:", error)
    throw error
  }
}

export default {
  addTransaction,
  getTransactions,
}
