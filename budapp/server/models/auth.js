import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import UserServices from "./userServices.js";
import { useNavigate } from "react-router-dom";
dotenv.config();

// Generates ACCCESS TOKEN
export function generateAccessToken(username) {
    return new Promise((resolve, reject) => {
      jwt.sign(
        { username: username },
        process.env.TOKEN_SECRET,
        { expiresIn: "1d" },
        (error, token) => {
          if (error) {
            reject(error);
          } else {
            resolve(token);
          }
        }
      );
    });
  }

  export async function authenticateUser(req, res, next) {
    const authHeader = req.headers["authorization"];
    //Getting the 2nd part of the auth header (the token)
    const token = authHeader && authHeader.split(" ")[1];
  
    if (!token) {
      console.log("No token received");
      res.status(401).end();
    } else {
      jwt.verify(
        token,
        process.env.TOKEN_SECRET,
        (error, decoded) => {
          if (decoded) {
            next();
          } else {
            console.log("JWT error:", error);
            res.status(401).end();
          }
        }
      );
    }
  }
  
  export async function loginUser(req, res) {
    const { username, pwd } = req.body; // from form
    const retrievedUser = await UserServices.getUserByEmail(username);
    console.log(retrievedUser);
    if (!retrievedUser) {
      // invalid username
      res.status(401).send("Unauthorized");
    } else {
      await bcrypt
        .compare(pwd, retrievedUser.password)
        .then((matched) => {
          if (matched) {
            generateAccessToken(username).then((token) => {
              res.status(200).send({ token: token });
              
            });
          } else {
            // invalid password
            console.error("INVALID PASS");
            res.status(401).send("Unauthorized");
          }
        })
        .catch(() => {
          console.error("UNAUTHORIZED");
          res.status(401).send("Unauthorized");
        });
    }
  }
  