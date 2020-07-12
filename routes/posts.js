const express = require('express');
const cloudinary = require('cloudinary');
const Post = require('../models/post');
const { checkLoggedIn, checkCorrectAuthor, checkFile, checkEditAllowed, checkCorrectReactor } = require('./postFunctions');
const router = express.Router();

cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_NAME, 
});

router.get('/frontpage/:sortType/:amount', async (req,res) => {
  const end = req.params.amount;
  const start = end-10;
  let sortType = req.params.sortType === 'top-sort' ? 'score' : 'uploadDate';
  //send array of 10 images to front
  const orderedPosts = await Post.find(null,null,{sort: {[sortType]: 1}});
  // console.log(req.params.sortType);
  // orderedPosts.map((post) => {
  //   console.log("ordered "+post.uploadDate)
  // })
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
    await post.save();
  } catch(error) {
    console.log('newpost', error);
  }
  return res.status(201).json("New post created");
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
})

//change this to only accept key and string and check current user to match key
// to prevent fraudulent posts
router.post('/updateEmoji', checkLoggedIn, checkCorrectReactor, async (req, res) => {
  try {
    // replaces entire post which isnt so good
    // const post = await Post.findOneAndUpdate(req.body._id, req.body, {new: true});
    // res.status(200).json(post);
    
  } catch (error) {
    console.log('updateEmoji: ', error);
  }
});

const handleImage = async (file, fileName) => {
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
    return './images/chem.jpg'
  } catch(error) {
    console.log('handleImage ',error);
  }
}





module.exports = router;