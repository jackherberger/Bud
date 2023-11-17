/* eslint-disable require-jsdoc */
import mongoose from "mongoose";
import { ObjectId, MongoClient, ServerApiVersion } from "mongodb";
import UserModel from "./user.js";
import CustomerModel from "./customer.js";
import TransactionModel from "./transaction.js";
import AccountModel from "./account.js";
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

async function addUser(name, email, password, permissions) {
  const user = {
    name: name,
    email: email,
    password: password,
    permissions: permissions,
  }
  const userToAdd = new UserModel(user);
  const promise = await userToAdd.save();
  return promise;
}

async function getUsers() {
  let promise;
  promise = await UserModel.find();
  return promise;
}

async function getUserByEmail(email) {
  try {
    const user = await UserModel.findOne({email});
    console.log(user)
    return user;
  } catch (error) {
    console.error('Error fetching user by email:', error);
    throw error;
  }
}

async function addCustomer(name, job) {
  const customer = {
    name: name,
    job: job,
  }
  const customerToAdd = new CustomerModel(customer);
  const promise = await customerToAdd.save();
  return promise;
}

async function addTransaction(amount, category, date, description) {
  const transaction = {
    amount: amount,
    category: category,
    date: date,
    description: description,
  }
  const transactionToAdd = new TransactionModel(transaction);
  const promise = await transactionToAdd.save();
  return promise;
}

export default {
  addUser,
  getUsers,
  addCustomer,
  addTransaction,
  getUserByEmail,
  
};
