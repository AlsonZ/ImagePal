const express = require('express');
const cloudinary = require('cloudinary');
const Post = require('../models/post');
const router = express.Router();

cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_NAME, 
});

router.get('/frontpage', (req,res) => {
  //send array of 10 images to front
});


// need to add checkLogin here as middleware
router.post('/upload', async (req, res) => {
  //get new uploaded post
  if(!req.files) {
    console.log('no file');
    return res.status(400).json('no file');
  }
  const file = req.files.file;
  // console.log('this is the file');
  // console.log(file);
  //upload image to cloudinary for storage
  const imageLink = await handleImage(file, req.body.fileName);
  if(imageLink === 'error') {
    return res.status(500);
  }
  console.log("this is imagelink " + imageLink);
  //make new post and save
  const post = new Post({
    author: req.body.author.username,
    imageUrl: imageLink,
    uploadDate: req.body.uploadedAt,
  });
  try {
    await post.save();
  } catch(error) {
    console.log(error);
  }
  console.log("New post created");
  return res.status(201).json("New post created");
})

const handleImage = async (file, fileName) => {
  const filepath = `./images/${fileName}`;
  file.mv(filepath, (error) => {
    console.log(error);
    return 'error';
  })
  try {
    const result = await cloudinary.v2.uploader.unsigned_upload(filepath,"imagepal", async=true);
    return result.url;
  } catch(error) {
    console.log(error);
  }
}

module.exports = router;