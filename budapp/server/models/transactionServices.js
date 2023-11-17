/* eslint-disable require-jsdoc */
import mongoose from "mongoose"
import TransactionModel from "./transaction.js"
import dotenv from "dotenv";
dotenv.config();

mongoose.set("debug", true);
// const connectionString = `mongodb://localhost:27017/mongo`;
const uri = process.env.MONGODB_URI_STRING;
// Create a MongoClient with a MongoClientOptions object to set the Stable API version

mongoose.connect(uri).then(() => {
  console.log('Connected to MongoDB');
})
.catch((err) => {
  console.error('MongoDB connection error:', err);
});

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
