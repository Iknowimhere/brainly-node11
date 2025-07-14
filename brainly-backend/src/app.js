import express from "express";
import mongoose from "mongoose";
let app = express();

//db connection
async function db() {
  try {
    await mongoose.connect("mongodb://127.0.0.1/brainlyDB");
    console.log("db connected 🛢️");
  } catch (error) {
    console.log("db error", error.message);
  }
}
db();

//model the application
//user model
let userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minLength: [4, "username min characters are 4"],
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: [true, "password is required field"],
  },
  confirmPassword: {
    type: String,
    required: [true, "password is required field"],
    validate: {
      validator: function (value) {
        return value === this.password;
      },
      message: "Password and Confirm password doesnt match",
    },
  },
});

let User = mongoose.model("User", userSchema);

//middleware
app.use(express.json());

//singup
app.post("/signup", async (req, res) => {
  let { username, password, confirmPassword } = req.body;
  try {
    let existingUser = await User.findOne({ username });
    if (existingUser) {
      res.status(400).json({ message: "User already exists.Please Login!" });
      return;
    }
    let newUser = await User.create({
      username,
      password,
      confirmPassword,
    });
    if (!newUser) {
      res.status(400).json({ message: "Truoble creating User" });
      return;
    }
    res.status(200).json(newUser);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message,
    });
  }
});

//singin
app.post("/signin", async (req, res) => {
  let { username, password } = req.body;
  try {
    let existingUser = await User.findOne({ username });
    if (!existingUser) {
      res.status(400).json({ message: "Username doesn't exist.Please Signup!" });
      return;
    }
    if (password !== existingUser.password) {
      res.status(400).json({ message: "Password doesn't match" });
      return;
    }
    res.status(200).json(existingUser);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message,
    });
  }
});
export default app;
