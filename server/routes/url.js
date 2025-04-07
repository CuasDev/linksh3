const express = require('express');
const router = express.Router();
const validUrl = require('valid-url');
const { nanoid } = require('nanoid');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const Url = require('../models/Url');
const { protect, admin } = require('../middleware/auth');

// @route   POST /api/url/shorten
// @desc    Create short URL
// @access  Public - works for both authenticated and anonymous users
router.post('/shorten', async (req, res) => {
  let userId = null;

  // Check for authentication token
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies && req.cookies.token) {
    token = req.cookies.token;
  }

  // If token exists, verify it and get user
  if (token) {
    try {
      const secret = process.env.JWT_SECRET || 'linksh3_jwt_secret_key_change_in_production';
      const decoded = jwt.verify(token, secret);
      const user = await User.findById(decoded.id).select('-password');
      if (user) {
        userId = user._id;
      }
    } catch (error) {
      console.log('Token verification failed, proceeding as anonymous user');
    }
  }
  const { longUrl } = req.body;
  const baseUrl = process.env.BASE_URL || `http://localhost:${process.env.PORT || 5000}`;

  // Check if the URL is valid
  if (!validUrl.isUri(longUrl)) {
    return res.status(400).json({ error: 'Invalid URL' });
  }

  try {
    
    // Check if the URL already exists in the database
    // For authenticated users, check only their URLs
    const query = userId ? { longUrl, user: userId } : { longUrl, user: null };
    let url = await Url.findOne(query);

    if (url) {
      return res.json(url);
    }

    // Create URL code
    const urlCode = nanoid(6);

    // Create short URL
    const shortUrl = `${baseUrl}/${urlCode}`;

    // Create new URL object
    url = new Url({
      urlCode,
      longUrl,
      shortUrl,
      user: userId,
      createdAt: new Date(),
    });

    // Save URL to database
    await url.save();

    res.json(url);
  } catch (err) {
    console.error('Error shortening URL:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// @route   GET /api/url/stats
// @desc    Get all URL statistics (public URLs only)
// @access  Public
router.get('/stats', async (req, res) => {
  try {
    // Only return URLs that don't have a user (public/anonymous URLs)
    const urls = await Url.find({ user: null }).sort({ createdAt: -1 });
    res.json(urls);
  } catch (err) {
    console.error('Error getting URL stats:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// @route   GET /api/url/my-urls
// @desc    Get user's own URLs
// @access  Private
router.get('/my-urls', protect, async (req, res) => {
  try {
    const urls = await Url.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(urls);
  } catch (err) {
    console.error('Error getting user URLs:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// @route   GET /api/url/admin-stats
// @desc    Get all URLs (admin only)
// @access  Private/Admin
router.get('/admin-stats', protect, admin, async (req, res) => {
  try {
    const urls = await Url.find().populate('user', 'username email').sort({ createdAt: -1 });
    res.json(urls);
  } catch (err) {
    console.error('Error getting admin URL stats:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// @route   DELETE /api/url/:id
// @desc    Delete a URL
// @access  Private
router.delete('/:id', protect, async (req, res) => {
  try {
    const url = await Url.findById(req.params.id);
    
    if (!url) {
      return res.status(404).json({ error: 'URL not found' });
    }
    
    // Check if user owns the URL or is admin
    if (url.user && url.user.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Not authorized to delete this URL' });
    }
    
    await Url.findByIdAndDelete(req.params.id);
    res.json({ message: 'URL removed' });
  } catch (err) {
    console.error('Error deleting URL:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;