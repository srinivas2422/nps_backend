// const mongoose = require('mongoose');

// const userSchema = new mongoose.Schema({
//   phone: {
//     type: String,
//     required: [true, 'Phone number is required'],
//     unique: true,
//     match: [/^[0-9]{10}$/, 'Phone number must be a 10-digit number']
//   },
//   password: {
//     type: String,
//     required: [true, 'Password is required'],
//     minlength: [6, 'Password must be at least 6 characters long']
//   }
// }, { collection: 'UserDetails' });

// const User = mongoose.model('User', userSchema);

// module.exports = User;


const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    default: ''
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    unique: true,
    match: [/^[0-9]{10}$/, 'Phone number must be a 10-digit number']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters long']
  }
}, { collection: 'UserDetails' });

const User = mongoose.model('User', userSchema);

module.exports = User;
