// Module Imports
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
// Routes
import allPens from "./routes/allpens.js";
import register from "./routes/register.js";
import signin from "./routes/signin.js";
import updatePen from "./routes/updatePen.js";
import pen from "./routes/pen.js";
import newPen from "./routes/newPen.js";
// Modals
import User from "./modals/user.js";

// For ENV varibles
dotenv.config();
//Middlewares
const app = express();
app.use(cors());
app.use(express.json());
//Connecting to Mongodb Database called torism
const connect = () => {
  mongoose.set("useCreateIndex", true);
  return mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

connect();
app.get("/allpens", (req, res) => allPens(req, res, User));
app.post("/register", async (req, res) => register(req, res, User, bcrypt));
app.post("/signin", async (req, res) => signin(req, res, User, bcrypt));
app.post("/addpen", (req, res) => newPen(req, res, User));
app.post("/update/pen", async (req, res) => updatePen(req, res, User));
app.get("/pen", async (req, res) => pen(req, res, User));
const port = process.env.PORT || 5000;

app.listen(port, () => `Server running on port ${port} 🔥`);
// UserSchema
