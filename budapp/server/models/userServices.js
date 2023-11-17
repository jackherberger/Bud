/* eslint-disable require-jsdoc */
import mongoose from "mongoose";
import { ObjectId, MongoClient, ServerApiVersion } from "mongodb";
import UserModel from "./user.js";
import CustomerModel from "./customer.js";
import TransactionModel from "./transaction.js";
import AccountModel from "./account.js";

mongoose.set("debug", true);
const uri = "mongodb+srv://dbadmin:CPRootPassword@budcluster.lzrkphl.mongodb.net/?retryWrites=true&w=majority";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect().then(()=>console.log('connected')).catch(e=>console.log(e));
    // Send a ping to confirm a successful connection
    await client.db("mongo").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");

    const database = client.db("mongo");
    const collections = await database.listCollections().toArray();

    console.log("Collections in the database:");
    collections.forEach(collection => console.log(collection.name));
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

run().catch(console.dir);

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

async function getUserByEmail(userEmail) {
  try {
    console.log(userEmail)
    const user = await UserModel.find();
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
