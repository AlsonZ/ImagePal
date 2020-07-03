const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  uploadDate: {
    type: Date,
    required: true,
    default: Date.now
  },
  imageUrl: {
    type: String,
    retured: true
  },
  emoji: {
    love: Number,
    happy: Number,
    sad: Number,
    angry: Number,
    evil: Number,
  },
  comments: [{
    _id: {
      type: mongoose.Schema.Types.ObjectId,
    },
    username: {
      type: String,
      required: true
    },
    imageUrl: {
      type: String,
    },
    comments: []
  }]
})
// first argument is singular name of collection -> auto convert to plural
module.exports = mongoose.model('post', postSchema)