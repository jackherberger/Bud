import mongoose from "mongoose";
import Transaction from "./transaction.js";
import Account from "./account.js";

const customerSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        job: {
            type: String,
            required: true,
            trim: true,
            validate(value) {
                if (value.length < 2)
                throw new Error("Invalid job, must be at least 2 characters.");
            },
       
        },
        transaction_list: {
            type: [Transaction.schema],
            required: false,
        },
        account: {
            type: mongoose.ObjectId,
            required: false,
            ref: "Account",
        }

    },
    { collection: "customer_list" }
    );

const Customer = mongoose.model("Customer", customerSchema);

export default Customer;