const express = require('express');
const User = require('../models/userModel');

const router = express.Router();

router.post('/signup', async (req, res) => {
  const { phone, password } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ phone });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Create a new user
    const user = new User({ phone, password });
    await user.save();

    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    if (error.name === 'ValidationError') {
      // Validation error
      const errors = Object.values(error.errors).map(err => err.message);
      res.status(400).json({ error: errors.join(', ') });
    } else {
      // Other errors
      res.status(500).json({ error: 'Internal server error' });
    }
  }
});

router.post('/signin', async (req, res) => {
  const { phone, password } = req.body;

  try {
    // Check if the user exists
    const user = await User.findOne({ phone });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Check if the password matches
    if (user.password !== password) {
      return res.status(401).json({ error: 'Incorrect password' });
    }

    res.status(200).json({ message: 'Signin successful' });
  } catch (error) {
    console.error('Error during signin:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
