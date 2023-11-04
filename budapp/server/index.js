import express from "express";
import cors from "cors";
import userServices from "./models/user-services.js"


const savedUser = await userServices.addUser({name: "John", job: "Developer"});
const users = await userServices.getUsers();
console.log(savedUser);
console.log(users);

const PORT = process.env.PORT || 3001;

const app = express();


app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});


