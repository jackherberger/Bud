import mongoose from "mongoose";
import userModel from "./user.js";

mongoose.set("debug", true);
const connectionString = `mongodb://localhost:27017/mongo`;

mongoose.connect(connectionString, {
 
    
    authSource: "admin",
    // user: "root",
    //  pass: "rootpassword",
    
    
  })
    .then(() => {
      console.log('Connected to MongoDB');
    })
    .catch((err) => {
      console.error('MongoDB connection error:', err);
    });

    function addUser(user) {
      const userToAdd = new userModel(user);
      const promise = userToAdd.save();
      return promise;
    }
    function getUsers() {
      let promise;
     
        promise = userModel.find();
      
    
      return promise;
    }
export default {
  addUser,
  getUsers,

};