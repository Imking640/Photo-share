// backend/server.js

require('dotenv').config();
const express  = require('express');
const mongoose = require('mongoose');
const cors     = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json()); // parse JSON bodies

// Health check route
app.get('/', (req, res) => {
  res.json({ message: 'Photo-Share API is running!' });
});

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser:    true,
    useUnifiedTopology: true
  })
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server listening on http://localhost:${PORT}`);
});

// backend/server.js (excerpt)

const authRoutes = require('./routes/auth');
const postRoutes = require('./routes/posts');

app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);

