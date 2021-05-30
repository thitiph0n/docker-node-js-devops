const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'User must have a username'],
    index: true,
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'User must have a password'],
  },
});

const User = mongoose.model('user', userSchema);
module.exports = User;
