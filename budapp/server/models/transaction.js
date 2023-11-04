import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
    {
        date: {
            type: String,
            required: true,
            trim: true,
        },
        amount: {
            type: String,
            required: true,
            trim: true,
            validate(value) {
                if (value.length < 2)
                throw new Error("Invalid amount, must be at least 2 characters.");
            },
        },
        category:{
            type: String,
            required: true,
            trim: true,
        },
        description:{
            type: String,
            required: true,
            trim: true,
        },

    },
    { collection: "transaction_list" }
    );
const Transaction = mongoose.model("Transaction", transactionSchema);

export default Transaction;