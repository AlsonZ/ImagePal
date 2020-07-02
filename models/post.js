const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
  
})
// first argument is singular name of collection -> auto convert to plural
module.exports = mongoose.model('post', postSchema)