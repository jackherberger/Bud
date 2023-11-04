import mongoose from "mongoose";

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
        if (!value.includes("@"))
          throw new Error("Invalid email, must include @.");
      },
    },
    password: {
      type: String,
      required: true,
      trim: true,
      validate(value) {
        if (value.length < 6)
          throw new Error("Invalid password, must be at least 6 characters.");
      },
    },
  },
  { collection: "users_list" }
);

const User = mongoose.model("User", UserSchema);

export default User;