const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: String,
    firstName: String,
    lastName: String,
    email: String,
    country: String,
    password: String,
    gender: String,
    role: String,
    lastLogin: Date,
  },
  { timestamps: true }
);

exports.UserModel = mongoose.model("users", userSchema);
