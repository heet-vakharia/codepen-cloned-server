// Module Imports
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
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
// let id = mongoose.Types.ObjectId();
app.post("/pens", async (req, res) => {
  const { userid } = req.body;
  await User.findOne({ userid }, (err, user) => {
    if (err || !user) {
      res.status(401).json({ msg: "Not Found", err, userid });
    } else {
      res.status(200).json({ pens: user.pens });
    }
  });
});
app.post("/register", async (req, res) => {
  const { userid, password } = req.body;
  if (userid && password) {
    const hashPassword = bcrypt.hashSync(password, 8);
    await User.create(
      { userid, password: hashPassword, pens: [] },
      (err, user) => {
        if (err || !user) {
          res.status(405).status("Plz enter Enter UserName and Password");
        } else {
          res.status(201).json(user);
        }
      }
    );
  }
});
app.post("/signin", async (req, res) => {
  const { userid, password } = req.body;
  if (userid && password) {
    User.findOne({ userid }, (err, user) => {
      if (err || !user) {
        res.status(404).status("USER NOT Found");
      } else {
        const pass = user.password;
        bcrypt.compare(password, pass, (err, resp) => {
          if (resp) {
            res.status(302).json(user);
          } else {
            res.status(404).json({ err: "Invalid Password" });
          }
        });
      }
    });
  }
});
app.post("/addpen", (req, res) => {
  const { name, id } = req.body;
  const pen = {
    name,
    code: {
      html: "",
      css: "",
      js: "",
    },
  };
  if (!name) {
    res.json("Ahh");
  } else {
    User.findByIdAndUpdate(
      id,
      { $push: { pens: pen } },
      { new: true },
      (err, user) => {
        if (!user || err) {
          return res.status(400).json({ message: "err" });
        } else {
          return res.json(user);
        }
      }
    );
  }
});
app.post("/update/pen", async (req, res) => {
  const { name, id, code } = req.body;
  if (!name) {
    return res.status(400).json({ message: "Fill Up Details" });
  } else {
    await User.findOneAndUpdate(
      { "pens.name": name, _id: id },
      { $set: { "pens.$.code": code } },
      { new: true },
      (err, pen) => {
        if (err || !pen) {
          return res.status(400).json({ message: "Not Found" });
        } else {
          return res.json({ message: pen, code });
        }
      }
    );
  }
});
const port = process.env.PORT || 5000;

app.listen(port, () => `Server running on port ${port} 🔥`);
// UserSchema
