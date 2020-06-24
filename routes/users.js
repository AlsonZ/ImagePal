const express = require('express');
const bcrypt = require('bycrptjs');
const User = require('../models/user');
const router = express.Router();

router.get('/login', async (req, res) => {
  if(req.session.userID) {
    //if user is already logged in
  }
  let user;
  try {
    [user] = await User.find({email: req.body.email.toLowerCase()});
    if(user) {
      if(bycrpyt.compareSync(req.body.password, user.password)) {
        res.session.userID = user.email;
        return res.status(200).json(res.session.userID);
      } else {
        //password is wrong
      }
    }
  } catch(error) {
    //big error, 
  }
});

router.post('/logout', (req, res) => {
  req.session.destroy();
  res.json('logout success');
})

router.post('/register', checkDuplicateUser, async (req, res) => {
  
});

async function checkDuplicateUser(req, res, next) {
  if(await checkElement(email, req.body.email.toLowerCase())) {
    // send error
    return res.status(409).json({message: "Email already exists!"})
  } else if(await checkElement(userName, req.body.userName)) {
    return res.status(409).json({message: "Username already exists!"})
  } else {
    next();
  }
}
async function checkElement(elementName, element) {
  let user;
  try {
    [user] = await User.find({[elementName]: element});
    if (user !== undefined) {
      //user with email exists
      return true;
    } else {
      return false;
    }
  } catch {
    // user does not exist
    return false;
  }
}

module.exports = router;