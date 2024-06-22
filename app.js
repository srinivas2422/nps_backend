// Load environment variables from .env file
require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const userRoute = require('./routes/auth')

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Atlas URI
const uri = process.env.ATLAS_URI;
if (!uri) {
  throw new Error('MongoDB connection string is missing in environment variables');
}

// Connect to MongoDB Atlas
mongoose.connect(uri)
  .then(() => console.log("MongoDB database connection established successfully"))
  .catch(err => {
    console.error("MongoDB connection error:", err);
    process.exit(1);  // Exit process if connection fails
  });


// Example route to handle POST request
app.use('/api/users', userRoute);

// Start server
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
