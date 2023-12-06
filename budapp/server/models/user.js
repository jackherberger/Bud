import mongoose from "mongoose"
import Customer from "./customer.js"

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    permissions: {
      type: Number,
      required: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      validate(value) {
        if (!value.includes("@")) {
          throw new Error("Invalid email, must include @.")
        }
      },
    },
    password: {
      type: String,
      required: true,
      trim: true,
      validate(value) {
        if (value.length < 6) {
          throw new Error("Invalid password, must be at least 6 characters.")
        }
      },
    },
    customer: {
      type: mongoose.ObjectId,
      required: false,
      ref: "Customer",
    },
  },
  { collection: "users_list" },
  { bufferTimeoutMS: 1000 }
)

const User = mongoose.model("User", UserSchema)

export default User
