import User from "../models/user.model.js";
import jwt from 'jsonwebtoken'

let createToken=(id)=>{
  return jwt.sign({id},"topSecret",{
    expiresIn:'1d'
  })
}

let signup = async (req, res) => {
  let {username,password,confirmPassword}=req.body;
  try {
    let existingUser = await User.findOne({ username });
    if (existingUser) {
      res.status(400).json({ message: "User already exists.Please Login!" });
      return;
    }
    let newUser= await User.create({
        username,
        password:password,
        confirmPassword:confirmPassword,
      });

    if (!newUser) {
      res.status(400).json({ message: "Trouble creating User" });
      return;
    }
    let token=createToken(newUser._id)
    res.status(200).json({newUser,token});
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
    let token=createToken(existingUser._id)
    res.status(200).json({existingUser,token});
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message,
    });
  }
};

export { signup, signin };
