import User from "../models/User.js";
import asyncHandler from "../utils/asyncHandler.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import registerValidator from "../validators/auth/registerValidator.js";
import loginValidator from "../validators/auth/loginValidator.js";

const register = asyncHandler(async (req, res) => {
  const { error } = registerValidator.validate(req.body);
  if (error) {
    return res
      .status(400)
      .json({ errors: error.details.map((err) => err.message) });
  }

  const { username, email, password } = req.body;

  const user = await User.findOne({ email });
  if (user) {
    return res.json({ message: "user already exists" });
  }

  const hashpassword = await bcrypt.hash(password, 10);
  await User.create({
    username,
    email,
    password: hashpassword,
  });

  return res.json({ status: true, message: "user registered" });
});

const login = asyncHandler(async (req, res) => {
  const { error } = loginValidator.validate(req.body);
  if (error) {
    return res
      .status(400)
      .json({ errors: error.details.map((err) => err.message) });
  }

  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.json({ message: "User is not registered" });
  }
  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    return res.json({ message: "password is incorrect" });
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  res.cookie("token", token, {
    path: "/",
    httpOnly: true,
    maxAge: 3600000,
    sameSite: "Strict",
    secure: process.env.NODE_ENV === "production",
  });
  return res.json({ status: true, message: "Login Successfull" });
});
const logout = asyncHandler((req, res) => {
  res.clearCookie("token", { path: "/" });
  return res.json({ status: true, message: "User logged out" });
});

export { register, login, logout };
