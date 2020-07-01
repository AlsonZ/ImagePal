const express = require('express');
const router = express.Router();

router.get('/frontpage', (req,res) => {
  //send array of 10 images to svr
});

router.post('/upload', (req, res) => {
  //get new uploaded post
  if(!req.files) {
    console.log('no file');
    return res.status(400).json('no file');
  }
  const file = req.files.file;
  console.log(req.body.uploadedBy);
  console.log(req.body.uploadedAt);
})

module.exports = router;