const User = require('../models/user')
const Post = require('../models/post');

const checkLoggedIn = (req, res, next) => {
  if (req.session.userID) {
    next();
  } else {
    res.status(401).json('Login is required');
  }
}

const checkCorrectAuthor = async (req, res, next) => {
  // get id, get username, comapre to author from getting post, 
  // not author from request as that is for new post
  const [user] = await User.find({user_token: req.session.userID});
  const post = await Post.findById(req.body.postID);
  req.post = await post;
  if(user.username === post.author) {
    next();
  } else {
    res.status(401).json('Wrong User');
  }

}

const checkEditAllowed = (req, res, next) => {
  const post = req.post;
  if(post.comments && post.comments.length <= 0 && !post.reactions) {
    next();
  } else {
    res.status(403).json('post has comments or reactions');
  }

}

const checkFile = (req, res, next) => {
  if(!req.files) {
    console.log('no file');
    return res.status(400).json('no file');
  } else {
    next();
  }
}

const checkCorrectReactor = async (req, res, next) => {
  // get user, get post to update
  // compare user.username to key in the object
  // if user.username does not exist, means it is a new reaction
  const [user] = await User.find({user_token: req.session.userID});
  const post = await Post.findById(req.body._id);
  // if(post.reactions[user.username]) {
  if(post.reactions && post.reactions.hasOwnProperty(user.username)) {
    req.newReaction = false;
  } else {
    req.newReaction = true;
  }
  req.user = user;
  req.post = post;
  next();
}

module.exports.checkFile = checkFile;
module.exports.checkEditAllowed = checkEditAllowed;
module.exports.checkCorrectAuthor = checkCorrectAuthor;
module.exports.checkCorrectReactor = checkCorrectReactor;
module.exports.checkLoggedIn = checkLoggedIn;