const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: {
    type: String
  },
  author: {
    type: String
  },
  bookCover: {
    type: String
  },
  genre: {
    type: String
  },
  reviews: {
    type: Number
  }
})

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  photo: {
    type: String
  },
  signUpDate: {
    type: Date,
    default: Date.now
  },
  id: {
    type: String,
    required: true
  },
  books: {
    type: [ bookSchema ],
    default: []
  }
}, {  collection: 'users' });

module.exports = mongoose.model('Users', userSchema);