import mongoose from 'mongoose'
import bcrypt from 'bcryptjs';
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
    validate:{
      validator:function(value){
        return String(value).match(/^[a-zA-Z0-9!@#\$%\^\&*_=+-]{8,12}$/g)
      },
      message:`Password should have At least 1 Uppercase, At least 1 Lowercase,  At least 1 Number,At least 1 Symbol, symbol allowed --> !@#$%^&*_=+- , Min 8 chars and Max 12 chars`
    }
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

//pre hook middleware-mongoose
userSchema.pre("save",async function(next){
  this.password=await bcrypt.hash(this.password,10)
  next()
})

userSchema.methods.comparePassword=async function(pwd,pwdDB){
  return await bcrypt.compare(pwd,pwdDB)
}

let User = mongoose.model("User", userSchema);

export default User;
//password
// At least 1 Uppercase
// At least 1 Lowercase
// At least 1 Number
// At least 1 Symbol, symbol allowed --> !@#$%^&*_=+-
// Min 8 chars and Max 12 chars