const express = require('express');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const User = require('../models/user');
const { db } = require('../models/user');
const router = express.Router();

router.get('/checkLoggedIn', async (req, res) => {
  const userID = req.session.userID;
  console.log('User is already logged in');
  //get user and return details
  const user = await checkElement('user_token', req.session.userID);
  if(!user) {
    return res.status(500).json('error');
  }
  const userData = {
    email: user.email,
    username: user.username
  }
  return res.status(200).json(userData)
})

router.post('/login', async (req, res) => {
  if(req.session.userID) {
    // if user is already logged in
    // do nothing as client should redirect them already 
  }
  let user;
  try {
    [user] = await User.find({email: req.body.email.toLowerCase()});
    if(user) {
      if(bcrypt.compareSync(req.body.password, user.password)) {
        // res.session.userID = user.email;
        // generate ID  
        // use id to check future saved logins
        let userID = new mongoose.Types.ObjectId().toHexString();
        user.user_token = userID;
        await user.save();
        res.session.userID = user.user_token;
        const userData = {
          email: user.email,
          username: user.username
        }
        return res.status(200).json(userData);
      } else {
        //password is wrong
        return res.status(409).json("error");
      }
    } else {
      //email is wrong
      return res.status(409).json("error");
    }
  } catch(error) {
    // error
    return res.status(500).json("error");
  }
});

router.post('/logout', (req, res) => {
  req.session.destroy();
  res.json('logout success');
})

router.post('/register', checkDuplicateUser, async (req, res) => {
  const password = bcrypt.hashSync(req.body.password, 10);
  const user = new User({
    registerIP: req.ip,
    email: req.body.email.toLowerCase(),
    username: req.body.username,
    password: password,
  });
  await user.save();
  console.log('new user registered: ' + req.body.email);
  res.status(201).json({message: 'registered'});
});

async function checkDuplicateUser(req, res, next) {
  if(await checkElement("email", req.body.email.toLowerCase())) {
    // send error
    return res.status(409).json({error: "Email already exists!"})
  } else if(await checkElement("username", req.body.username)) {
    return res.status(409).json({error: "Username already exists!"})
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
      return user;
    } else {
      return false;
    }
  } catch {
    // user does not exist
    return false;
  }
}

module.exports = router;