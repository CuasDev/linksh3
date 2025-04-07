const express = require('express');
const router = express.Router();

const Url = require('../models/Url');

// @route   GET /:code
// @desc    Redirect to long URL
router.get('/:code', async (req, res) => {
  try {
    const url = await Url.findOne({ urlCode: req.params.code });

    if (url) {
      // Increment click count
      url.clicks++;
      await url.save();
      
      // Redirect to the long URL
      return res.redirect(url.longUrl);
    } else {
      return res.status(404).json({ error: 'URL not found' });
    }
  } catch (err) {
    console.error('Error redirecting:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;