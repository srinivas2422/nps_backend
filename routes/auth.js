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

    res.status(201).json({ message: 'User created successfully', userId: user._id });
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

    res.status(200).json({ message: 'Signin successful', userId: user._id });
  } catch (error) {
    console.error('Error during signin:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Route to get user details by userId
router.get('/:userId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error('Error fetching user details:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, phone, password } = req.body;

  try {
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update user fields
    if (name !== undefined) user.name = name;
    if (phone !== undefined) user.phone = phone;
    if (password !== undefined) user.password = password;

    await user.save();

    res.status(200).json({ message: 'User details updated successfully', user });
  } catch (error) {
    res.status(500).json({ message: 'Error updating user details', error });
  }
});

module.exports = router;

