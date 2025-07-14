import mongoose from 'mongoose'
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

export default User;