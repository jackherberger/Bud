import express from "express";
import cors from "cors";
import Services from "./models/services.js"

// these are tests to see if the database is working use as base for logic in the future
const savedUser = await Services.addUser("dude", "horse@gamil", "ppopeede", 0);
const users = await Services.getUsers();


//console.log(savedUser);
console.log(users);

const PORT = process.env.PORT || 3001;

const app = express();


app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});


