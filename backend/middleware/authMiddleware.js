// backend/middleware/authMiddleware.js

const jwt   = require('jsonwebtoken');

module.exports = (req, res, next) => {
  // Expect token in Authorization header as "Bearer <token>"
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Missing or malformed token' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: payload.id };   // attach user data for controllers
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
};