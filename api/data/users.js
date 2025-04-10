const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || "dev_secret_key";

// POST /api/signup
router.post("/signup", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: "Username and password required" });
  }

  try {
    const existing = await User.findOne({ username });
    if (existing) return res.status(409).json({ error: "User already exists" });

    const passwordHash = bcrypt.hashSync(password, 10);
    const newUser = new User({ username, passwordHash });
    await newUser.save();

    const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: "2h" });
    res.status(201).json({ token });
  } catch (err) {
    res.status(500).json({ error: "Signup failed" });
  }
});

module.exports = router;