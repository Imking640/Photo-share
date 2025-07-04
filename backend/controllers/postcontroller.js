// backend/controllers/postController.js

const Post      = require('../models/post');    // ← Require the Post model
const cloudinary = require('../utils/cloudinary');

// Create a new post
exports.createPost = async (req, res) => {
  try {
    // assume req.file.path contains local temp path from multer
    const uploaded = await cloudinary.uploader.upload(req.file.path, {
  folder: 'photo_share_posts'
});
    const post = await Post.create({
      imageUrl: uploaded.secure_url,
      caption: req.body.caption,
      author: req.user.id
    });
    res.status(201).json(post);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Fetch all posts
exports.getFeed = async (req, res) => {
  try {
    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .populate('author', 'name avatar');
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};