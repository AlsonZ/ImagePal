const express = require('express');
const cloudinary = require('cloudinary');
const Post = require('../models/post');
const { checkLoggedIn, checkCorrectAuthor, checkFile, checkEditAllowed, 
  checkNewReaction, checkDeleteReaction, checkDeleteAllowed, 
  updatePostFromUser, removePostFromUser } = require('./postFunctions');
const user = require('../models/user');
const { findByIdAndDelete } = require('../models/post');
const router = express.Router();

cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_NAME, 
});

router.get('/frontpage/:sortType/:amount', async (req,res) => {
  const end = req.params.amount;
  const start = end-10;
  let sortType = req.params.sortType === 'top-sort' ? 'score' : 'uploadDate';
  let sortOrder = req.params.sortType === 'top-sort' ? -1 : 1;
  //send array of 10 images to front
  const orderedPosts = await Post.find(null,null,{sort: {[sortType]: sortOrder}});
  const data = orderedPosts.slice(start, end);
  res.status(200).json(data);
});
router.get('/post/:id', async (req,res) => {
  const id = req.params.id;
  try {
    const post = await Post.findById(id);
    // console.log('post', post);
    if(post) {
      res.status(200).json(post);
    } else {
      res.status(404).json('');
    }
  } catch (error) {
    console.log('post', error);
    //post does not exist
    res.status(404);
  }
});
router.post('/newpost', checkLoggedIn, checkFile, async (req, res) => {
  //upload image to cloudinary for storage
  const imageLink = await handleImage(req.files.file, req.body.fileName);
  if(imageLink === 'error') {
    return res.status(500);
  }
  // console.log("this is imagelink " + imageLink);
  //make new post and save
  const post = new Post({
    author: req.body.author,
    imageUrl: imageLink,
    uploadDate: req.body.uploadedAt,
  });
  // console.log(post);
  try {
    await post.save((error, post) => {
      if(error) {
        console.log(error);
      }
      updatePostFromUser(req.session.userID, post._id);
      return res.status(201).json(post._id);
    });
  } catch(error) {
    console.log('newpost', error);
  }
});

router.post('/editpost', checkLoggedIn, checkCorrectAuthor, 
              checkFile, checkEditAllowed, async (req, res) => {
  // get url
  const imageLink = await handleImage(req.files.file, req.body.fileName);
  if(imageLink === 'error') {
    return res.status(500);
  }
  // update post
  try {
    const post = await Post.findByIdAndUpdate(req.body.postID, {
      imageUrl: imageLink,
      lastEditDate: req.body.uploadedAt,
    }, {new:true});
    res.status(200).json('successful edit');
  } catch (error) {
    console.log('editpost ', error);
  }
});

router.delete('/deletepost', checkLoggedIn, checkCorrectAuthor, checkDeleteAllowed, async (req, res) => {
  try {
    if( req && req.placeholderRequired) {
      const placeholder = 'https://res.cloudinary.com/azy/image/upload/v1595836894/imagepal/mocyztzvnm6aq3mkf4ab.png'
      const post = await Post.findByIdAndUpdate(req.body.postID, {
        imageUrl: placeholder,
      }, {new:true});
      res.status(200).json('Post has been replaced with placeholder');
    } else {
      post = await Post.findByIdAndDelete(req.body.postID);
      removePostFromUser(req.session.userID, req.body.postID);
      res.status(200).json("successfully deleted")
    }
  } catch (error) {
    console.log('delete post: ', error);
  }
})

router.post('/updateEmoji', checkLoggedIn, checkNewReaction, checkDeleteReaction, async (req, res) => {
  try {
    let post;
    if(req.deleteReaction) {
      // as mongodb $unset requires dot notation 
      const reactionsDotNotation = `reactions.${req.user.username}`
      post = await Post.findByIdAndUpdate(req.body._id, 
        { 
          $unset : {[reactionsDotNotation]: ''},
          $inc: {score: -1}
        }, 
          {new:true}
      );
    } else {
      // same for $set 
      const reactionsDotNotation = `reactions.${req.user.username}`
      post = await Post.findByIdAndUpdate(req.body._id, 
        { 
          $set: {[reactionsDotNotation]: req.body.reaction},
          $inc: {score: req.newReaction ? 1 : 0}
        }, 
          {new:true}
      );
    }
    res.status(200).json(post);
  } catch(error) {
    console.log('updateEmoji: ', error);
  }
});

router.post('/newComment/:postID', checkLoggedIn, async (req, res) => {
  const imageLink = await handleImage(req.files.file, req.body.fileName);
  if(imageLink === 'error') {
    return res.status(500);
  }
  const comment = {
    "imageUrl": imageLink,
    "uploadDate": req.body.uploadedAt,
    "author": req.body.author
  }
  try {
    const post = await Post.findByIdAndUpdate(req.params.postID, {
      $push : {
        comments : comment
      }
    },{new: true})
    res.status(200).json('success');
  } catch (error) {
    console.log('New Comment: ', error)
  }
  
})

const handleImage = async (file, fileName, req) => {
  const filepath = `./images/${fileName}`;
  file.mv(filepath, (error) => {
    if(error) {
      console.log('handelImageMV ', error);
      return 'error';
    }
  })
  try {
    // const result = await cloudinary.v2.uploader.unsigned_upload(filepath,"imagepal", async=true);
    // return result.url;
    return '../images/bio.jpg'
  } catch(error) {
    console.log('handleImage ',error);
  }
}





module.exports = router;