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
    required: true
  },
  score: {
    type: Number,
    default: 0
  },
  reactions: {
    love: [{
      type: String,
    }],
    happy: [{
      type: String,
    }],
    sad: [{
      type: String,
    }],
    angry: [{
      type: String,
    }],
    evil: [{
      type: String,
    }],
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
module.exports = mongoose.model('Post', postSchema)