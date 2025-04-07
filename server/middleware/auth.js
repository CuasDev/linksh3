const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Middleware to verify JWT token
exports.protect = async (req, res, next) => {
  let token;

  // Check if token exists in headers
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies && req.cookies.token) {
    // Check if token exists in cookies
    token = req.cookies.token;
  }

  // If no token found
  if (!token) {
    return res.status(401).json({ error: 'Not authorized to access this route' });
  }

  try {
    // Verify token
    const secret = process.env.JWT_SECRET || 'linksh3_jwt_secret_key_change_in_production';
    const decoded = jwt.verify(token, secret);

    // Get user from database
    req.user = await User.findById(decoded.id).select('-password');

    if (!req.user) {
      return res.status(401).json({ error: 'User not found' });
    }

    next();
  } catch (error) {
    return res.status(401).json({ error: 'Not authorized to access this route' });
  }
};

// Middleware to check if user is admin
exports.admin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    return res.status(403).json({ error: 'Access denied. Admin privileges required' });
  }
};