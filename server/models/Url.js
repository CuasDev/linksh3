const mongoose = require('mongoose');

const UrlSchema = new mongoose.Schema({
  urlCode: {
    type: String,
    required: true,
    unique: true,
  },
  longUrl: {
    type: String,
    required: true,
  },
  shortUrl: {
    type: String,
    required: true,
  },
  clicks: {
    type: Number,
    required: true,
    default: 0,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    // This field is optional to allow anonymous URL creation
    required: false
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
}); 

module.exports = mongoose.model('Url', UrlSchema);