import mongoose from "mongoose";

const AccountSchema = new mongoose.Schema(
    {
      balance: {
        type: Number,
        required: true,
        trim: true,
      },
      income: {
        type: Number,
        required: true,
        trim: true,
      },

      spending: {
        type: Number,
        required: true,
        trim: true,
      },

      saving: {
        type: Number,
        required: true,
        trim: true,
      },

      assets: {
        type: Map,
        of: String,
      },

    },
    {collection: "accounts_list"}
);

const Account = mongoose.model("Account", AccountSchema);
export default Account;
