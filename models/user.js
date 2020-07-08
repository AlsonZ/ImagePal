const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  registerIP: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  registerDate: {
    type: Date,
    default: Date.now
  },
  user_token: {
    type: String,
  },
  posts: [
    {
      type: String
    }
  ]
})
// first argument is singular name of collection -> auto convert to plural
module.exports = mongoose.model('User', userSchema)