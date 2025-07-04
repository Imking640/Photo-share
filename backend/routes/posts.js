// backend/routes/posts.js

const express    = require('express');
const router     = express.Router();
const multer     = require('multer');
const upload     = multer({ dest: 'tmp/' });
const { createPost, getFeed } = require('../controllers/postcontroller');
// backend/routes/posts.js

const auth = require('../middleware/authMiddleware');

router.post(
  '/',
  auth,
  upload.single('image'),
  createPost
);

router.get('/',           getFeed);
router.post('/', auth, upload.single('image'), createPost);

module.exports = router;
