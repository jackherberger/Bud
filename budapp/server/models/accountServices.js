/* eslint-disable require-jsdoc */
import mongoose from "mongoose";
import AccountModel from "./account.js";
import { ObjectId, MongoClient, ServerApiVersion } from "mongodb";
mongoose.set("debug", true);
// const connectionString = `mongodb://localhost:27017/mongo`;
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
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

run().catch(console.dir);


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
