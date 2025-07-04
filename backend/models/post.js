// backend/models/Post.js

const mongoose = require('mongoose');

const postSchema = new mongoose.Schema(
  {
    imageUrl: {
      type: String,
      required: true
    },
    caption: {
      type: String,
      trim: true,
      default: ''
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      }
    ]
  },
  { timestamps: true }
);

module.exports = mongoose.model('Post', postSchema);