const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  bookCover: {
    type: String,
    required: true
  },
  genre: {
    type: String,
    required: true
  },
  reviews: {
    type: Number,
    required: true
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
    type: String,
    required: true
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

module.exports.User = mongoose.model('Users', userSchema);
module.exports.Book = mongoose.model('Books', bookSchema);