const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();

// Import routes
const urlRoutes = require('./routes/url');
const redirectRoutes = require('./routes/redirect');
const authRoutes = require('./routes/auth');

// Initialize app
const app = express();

// Middleware
app.use(express.json());
app.use(cors({
  origin: process.env.NODE_ENV === 'production' ? process.env.BASE_URL : 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(cookieParser());

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/linksh3');
    console.log('MongoDB connected...');
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  }
};

connectDB();

// Define routes
app.use('/api/auth', authRoutes);
app.use('/api/url', urlRoutes);
app.use('/', redirectRoutes);

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('../client/build'));
  
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client', 'build', 'index.html'));
  });
}

// Define port
const PORT = process.env.PORT || 5000;

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});