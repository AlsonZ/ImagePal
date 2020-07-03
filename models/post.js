const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
  author: {
    type: String,
    required: true
  },
  uploadDate: {
    type: Date,
    default: Date.now
  },
  imageUrl: {
    type: String,
    retured: true
  },
  emoji: {
    love: {
      type: Number,
      default: 0
    },
    happy: {
      type: Number,
      default: 0
    },
    sad: {
      type: Number,
      default: 0
    },
    angry: {
      type: Number,
      default: 0
    },
    evil: {
      type: Number,
      default: 0
    },
  },
  comments: [{
    _id: {
      type: mongoose.Schema.Types.ObjectId,
    },
    author: {
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