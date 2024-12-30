import mongoose from "mongoose";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt'

dotenv.config();

const UserSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
    minlength: 3,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    minlength: [5, "Email must be of length 5"],
  },
  password: {
    type: String,
    required: true,
    minlength: [3, "Password must be of length 3"],
  },
});

UserSchema.methods.generateAuthToken = function () {
  const maxAge = 3 * 24 * 60 * 60;
  return jwt.sign(
    { id: this._id},
    process.env.JWT_SECRET,
    { expiresIn: maxAge }
  );
};

UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

UserSchema.statics.hashPassword = async function (password) {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

export const UserModel = mongoose.model("users", UserSchema);
