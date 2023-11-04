import mongoose from "mongoose";
import userModel from "./user.js";
import customerModel from "./customer.js";
import transactionModel from "./transaction.js";
import accountModel from "./account.js";

mongoose.set("debug", true);
const connectionString = `mongodb://localhost:27017/mongo`;

mongoose.connect(connectionString, {
    authSource: "admin",  
  })
    .then(() => {
      console.log('Connected to MongoDB');
    })
    .catch((err) => {
      console.error('MongoDB connection error:', err);
    });

    function addUser(name, email, password, permissions) {
      const user = {
        name : name,
        email: email,
        password: password,
        permissions: permissions,
      }
      const userToAdd = new userModel(user);
      const promise = userToAdd.save();
      return promise;
    }

    function getUsers() {
      let promise;
        promise = userModel.find();
      return promise;
    }

    function addCustomer(name, job) {
      const customer = {
        name : name,
        job: job,
      }
      const customerToAdd = new customerModel(customer);
      const promise = customerToAdd.save();
      return promise;
    }

    function addAccount(balance, income, spending, saving) {
      const account = {
        balance : balance,
        income: income,
        spending: spending,
        saving: saving
      }
      const accountToAdd = new accountModel(account);
      const promise = accountToAdd.save();
      return promise;
    }

    function addTransaction(amount, category, date, description) {
      const transaction = {
        amount : amount,
        category: category,
        date: date,
        description: description,
      }
      const transactionToAdd = new transactionModel(transaction);
      const promise = transactionToAdd.save();
      return promise;
    }
export default {
  addUser,
  getUsers,
  addCustomer,
  addAccount,
  addTransaction,
};