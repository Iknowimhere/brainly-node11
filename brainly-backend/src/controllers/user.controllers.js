import User from "../models/user.model.js";
import z from "zod";

let singupSchema = z.object({
  username: z.string().min(4),
  password: z.string(),
  confirmPassword: z.string(),
});

let signup = async (req, res) => {
  let {success,data,error} = singupSchema.safeParse(req.body);

  try {
    let existingUser = await User.findOne({ username: data.username });
    if (existingUser) {
      res.status(400).json({ message: "User already exists.Please Login!" });
      return;
    }
    let newUser;
    if (success) {
      newUser = await User.create({
        username: data.username,
        password: data.password,
        confirmPassword: data.confirmPassword,
      });
    }

    if (!newUser) {
      res.status(400).json({ message: "Trouble creating User" });
      return;
    }
    res.status(200).json(newUser);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message,
    });
  }
};

let signin = async (req, res) => {
  let { username, password } = req.body;
  try {
    let existingUser = await User.findOne({ username });
    if (!existingUser) {
      res
        .status(400)
        .json({ message: "Username doesn't exist.Please Signup!" });
      return;
    }
    //methods can be used on instance of Model
    let isMatch = await existingUser.comparePassword(
      password,
      existingUser.password
    );
    if (!isMatch) {
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
};

export { signup, signin };
