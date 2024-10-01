const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();
const User = require("../models/User");
const auth = require("../middleware/Auth");
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
    console.log("Inside login!!!", token);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

// Protected route example
router.get("/protected", auth, (req, res) => {
  res.json({ message: "You have access!" });
});

// Get user details
router.get("/me", auth, async (req, res) => {
  try {
    console.log("Inside me route!------------------");
    const user = await User.findById(req.userId).select(
      "name designation email"
    );
    console.log("user is: ", user);
    if (!user) {
      console.log("user not found!!");
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user);
  } catch (error) {
    console.log("Oh oh!!!! get user caught!!!");
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
