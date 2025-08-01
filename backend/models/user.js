// backend/models/User.js

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },
    password: {
      type: String,
      required: true
    },
    avatar: {
      type: String,      // URL to user’s profile image (optional)
      default: ''
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);