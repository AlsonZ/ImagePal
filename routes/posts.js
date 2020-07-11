const express = require('express');
const cloudinary = require('cloudinary');
const Post = require('../models/post');
const router = express.Router();

cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_NAME, 
});

const checkLoggedIn = (req, res, next) => {
  if (req.session.userID) {
    next();
  } else {
    res.status(401).json('Login is required');
  }
}

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
router.post('/upload', checkLoggedIn, async (req, res) => {
  //get new uploaded post
  if(!req.files) {
    console.log('no file');
    return res.status(400).json('no file');
  }
  const file = req.files.file;
  //upload image to cloudinary for storage
  const imageLink = await handleImage(file, req.body.fileName);
  if(imageLink === 'error') {
    return res.status(500);
  }
  console.log("this is imagelink " + imageLink);
  //make new post and save
  console.log(req.body);
  console.log(req.body.author);
  const post = new Post({
    author: req.body.author,
    imageUrl: imageLink,
    uploadDate: req.body.uploadedAt,
  });
  console.log(post);
  try {
    await post.save();
  } catch(error) {
    console.log('upload', error);
  }
  console.log("New post created");
  return res.status(201).json("New post created");
});

//change this to only accept key and string and check current user to match key
// to prevent fraudulent posts
router.post('/updateEmoji', async (req, res) => {
  try {
    const post = await Post.findOneAndUpdate(req.body._id, req.body, {new: true});
    res.status(200).json(post);
  } catch (error) {
    console.log('updateEmoji: ', error);
  }
});

const handleImage = async (file, fileName) => {
  const filepath = `./images/${fileName}`;
  file.mv(filepath, (error) => {
    console.log(error);
    return 'error';
  })
  try {
    // const result = await cloudinary.v2.uploader.unsigned_upload(filepath,"imagepal", async=true);
    // return result.url;
    return './images/bio.jpg'
  } catch(error) {
    console.log(error);
  }
}



module.exports = router;