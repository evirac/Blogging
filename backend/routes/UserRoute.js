const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();
const User = require("../models/User");
require("dotenv").config();

router.post("/register", async (req, res) => {
  const { name, designation, email, password } = req.body;

  try {
    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already registered" });
    }

    // Create new user
    const newUser = new User({
      name,
      designation,
      email,
      password: hashedPassword,
    });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Registration Error: ", error); // Log the error
    res.status(500).json({ error: "Server error during registration" });
  }
});

// Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "user not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "invalid password" });

    // Sign JWT
    const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
      expiresIn: "1h",
    });

    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

// Protected route example
router.get("/protected", verifyToken, (req, res) => {
  res.json({ message: "You have access!" });
});

// JWT verification middleware
function verifyToken(req, res, next) {
  const token = req.header("Authorization");
  if (!token)
    return res.status(401).json({ error: "No token, authorization denied" });

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: "Token is not valid" });
  }
}

// Get user details
router.get("/me", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select(
      "name designation email"
    );
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
