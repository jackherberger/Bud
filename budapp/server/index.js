import express from "express";
import cors from "cors";
import Services from "./models/services.js"

// these are tests to see if the database is working use as base for logic in the future
const savedUser = await Services.addUser("dude", "horse@gamil", "ppopeede", 0);
const users = await Services.getUsers();

const savedCustomer = await Services.addCustomer("dude man", "plumper");

const savedAccount = await Services.addAccount(100, 100, 100, 100);

const savedTransaction = await Services.addTransaction(100, "deposit", "today", "test");
//console.log(savedUser);
console.log(users);
console.log(savedCustomer);
console.log(savedAccount);
console.log(savedTransaction);

const PORT = process.env.PORT || 3001;

const app = express();


app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});


