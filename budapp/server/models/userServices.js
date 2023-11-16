/* eslint-disable require-jsdoc */
import mongoose from "mongoose";
import UserModel from "./user.js";
import CustomerModel from "./customer.js";
import TransactionModel from "./transaction.js";
import AccountModel from "./account.js";

mongoose.set("debug", true);
const connectionString = `mongodb://localhost:27017/mongo`;

mongoose.connect(connectionString, {
  authSource: "admin",
  user: "root",
  pass: "rootpassword",
})
    .then(() => {
      console.log('Connected to MongoDB');
    })
    .catch((err) => {
      console.error('MongoDB connection error:', err);
    });

function addUser(name, email, password, permissions) {
  const user = {
    name: name,
    email: email,
    password: password,
    permissions: permissions,
  }
  const userToAdd = new UserModel(user);
  const promise = userToAdd.save();
  return promise;
}

function getUsers() {
  let promise;
  promise = UserModel.find();
  return promise;
}

function getUser(email) {
  let promise;
  promise = UserModel.findOne({email})
  console.log(promise)
  return promise;
}

function addCustomer(name, job) {
  const customer = {
    name: name,
    job: job,
  }
  const customerToAdd = new CustomerModel(customer);
  const promise = customerToAdd.save();
  return promise;
}

function addTransaction(amount, category, date, description) {
  const transaction = {
    amount: amount,
    category: category,
    date: date,
    description: description,
  }
  const transactionToAdd = new TransactionModel(transaction);
  const promise = transactionToAdd.save();
  return promise;
}



export default {
  addUser,
  getUsers,
  addCustomer,
  addTransaction,
  getUser,
  
};
