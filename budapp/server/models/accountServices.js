/* eslint-disable require-jsdoc */
import mongoose from "mongoose";
import AccountModel from "./account.js";
import { ObjectId, MongoClient, ServerApiVersion } from "mongodb";
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


function addAccount(balance, income, spending, saving) {
  const account = {
    balance: balance,
    income: income,
    spending: spending,
    saving: saving
  }
  const accountToAdd = new AccountModel(account);
  const promise = accountToAdd.save();
  return promise;
}


function getAccountInfo(accountId) {
  const id = new ObjectId(accountId);
  const promise = AccountModel.find({_id: id});
  return promise;
}

function editAccountBalance(accountId, newBalance) {
  const id = new ObjectId(accountId);
  const promise = AccountModel.updateOne({_id: id}, {balance: newBalance});

  return promise;
}

function editAccountIncome(accountId, newIncome) {
  const id = new ObjectId(accountId);
  const promise = AccountModel.updateOne({_id: id}, {income: newIncome});
  return promise;
}

function editAccountSpending(accountId, newSpending) {
  const id = new ObjectId(accountId);
  const promise = AccountModel.updateOne({_id: id}, {spending: newSpending});
  return promise;
}

function editAccountSavings(accountId, newSavings) {
  const id = new ObjectId(accountId);
  const promise = AccountModel.updateOne({_id: id}, {saving: newSavings});
  return promise;
}

export default {
  addAccount,
  getAccountInfo,
  editAccountBalance,
  editAccountIncome,
  editAccountSpending,
  editAccountSavings,
  
};
