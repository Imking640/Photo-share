// backend/controllers/authController.js

const bcrypt = require('bcryptjs');
const jwt    = require('jsonwebtoken');
const User   = require('../models/user');    // ← Require the User model

// Register new user
exports.register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const hashed = await bcrypt.hash(password, 10);
    const user   = await User.create({ name, email, password: hashed });
    res.status(201).json({ user });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Login existing user
exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) throw new Error('Invalid credentials');
    const match = await bcrypt.compare(password, user.password);
    if (!match) throw new Error('Invalid credentials');
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '7d'
    });
    res.json({ token });
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
};