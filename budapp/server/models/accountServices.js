/* eslint-disable require-jsdoc */
import mongoose from "mongoose";
import AccountModel from "./account.js";
import { ObjectId } from "mongodb";

mongoose.set("debug", true);
const connectionString = `mongodb://localhost:27017/mongo`;

function getAccountId(customerId) {

}
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
