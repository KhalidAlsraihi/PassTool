import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../Models/user.js";

//Register user
export const register = async (req, res) => {
  const { email, password } = req.body;
  const existingUser = await User.findOne({ email: email });
  if (existingUser)
    return res.status(400).json({ message: "User already registered" });
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({
    email,
    password: hashedPassword,
  });
  const savedUser = await newUser.save();
  res.status(201).json({ message: "User registered successfully", savedUser });
  try {
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//Login user
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) return res.status(404).json({ message: "User does not exist" });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(404).json({ message: "Invalid credentials !" });
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    delete user.password;
    res.status(200).json({ message: "Login successfull", token, user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};
