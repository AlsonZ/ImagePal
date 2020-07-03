const express = require('express');
const fetch = require('node-fetch');
const FormData = require('form-data');
const fs = require('fs');
const streamifier = require('streamifier');
const cloudinary = require('cloudinary');
const router = express.Router();

cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_NAME, 
});

router.get('/frontpage', (req,res) => {
  //send array of 10 images to svr
});

router.post('/upload', async (req, res) => {
  //get new uploaded post
  if(!req.files) {
    console.log('no file');
    return res.status(400).json('no file');
  }
  const file = req.files.file;
  console.log('this is the file');
  console.log(file);
  //upload image to cloudinary for storage
  const imageLink = await handleImage(file, req.body.fileName);
  if(imageLink === 'error') {
    return res.status(500);
  }

  console.log(req.body.uploadedBy);
  console.log(req.body.uploadedAt);
  //make new post and save
})

const handleImage = async (file, fileName) => {
  const filepath = `./images/${fileName}`;
  file.mv(filepath, (error) => {
    console.log(error);
    return 'error';
  })
  
  // cloudinary.v2.uploader.unsigned_upload(filepath,"imagepal",(error, result) => {
  //   if(error) {
  //     console.log(error);
  //     return 'error';
  //   }
  //   console.log(result);
  //   return result.url;
  // });


  
  // let data = new FormData();
  // data.append('file', file.data);
  // data.append('upload_preset', 'imagepal');
  // const url = process.env.IMAGE_STORAGE_URL;
  // const res = await fetch(url, {
  //   method: 'POST',
  //   body: data,
  // })
  // const resData = await res.json();
  // console.log('this is resData');
  // console.log(resData);
  // return resData
}

module.exports = router;