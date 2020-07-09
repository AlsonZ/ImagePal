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
  orderedPosts.map((post) => {
    console.log("ordered "+post.uploadDate)
  })
  const data = orderedPosts.slice(start, end);
  res.status(200).json(data);
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
})

router.post('/updateEmoji', async (req, res) => {
  // console.log(req.body.post);
  console.log(req.body);
  // const post = Post.findOne(req.body.post._id);
  // console.log(post);

  try {
  } catch (error) {
    console.log("updateEmoji", error);
  }

})

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