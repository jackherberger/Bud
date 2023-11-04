import mongoose from "mongoose";
import Transaction from "./transaction";
import Account from "./account";

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
            type: [Transaction],
            required: false,
        },
        account: {
            type: Account,
            required: false,
        }

    },
    { collection: "customer_list" }
    );

const Customer = mongoose.model("Customer", customerSchema);

export default Customer;