/* eslint-disable require-jsdoc */
import mongoose from "mongoose";
import AccountModel from "./account.js";
import CustomerModel from "./customer.js";
import UserModel from "./user.js";
import { ObjectId } from "mongodb";
mongoose.set("debug", true);
// const connectionString = `mongodb://localhost:27017/mongo`

async function getCustomerInfo(customerId) {
  customerId = new ObjectId(customerId);
  const promise = CustomerModel.findOne({ _id: customerId });
  return promise;
}
async function addCustomer() {
  const customerToAdd = new CustomerModel();
  const promise = await customerToAdd.save();
  return promise;
}

async function attachAccountToCustomer(accountId, customerId) {
  try {
    const result = CustomerModel.updateOne(
      { _id: customerId },
      { account: accountId }
    );

    return result;
  } catch (error) {
    console.error("Error attaching account to customer:", error);
    throw error;
  }
}

async function attachCustomerToUser(customerId, userId) {
  try {
    const result = UserModel.updateOne(
      { _id: userId },
      { customer: customerId }
    );
    return result;
  } catch (error) {
    console.error("Error attaching customer to user", error);
    throw error;
  }
}

export default {
  attachAccountToCustomer,
  attachCustomerToUser,
  addCustomer,
  getCustomerInfo,
};
