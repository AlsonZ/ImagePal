const express = require('express');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const User = require('../models/user');
const Post = require('../models/post');
const user = require('../models/user');
const router = express.Router();

const checkLoggedIn = (req, res, next) => {
  if (req.session.userID) {
    next();
  } else {
    res.status(401).json('Login is required');
  }
}

router.get('/checkLoggedIn', async (req, res) => {
  const userID = req.session.userID;
  console.log('Check if user is already logged in: '+userID);
  //get user and return details
  const user = await checkElement('user_token', userID);
  if(!user) {
    return res.status(401).json('not logged in');
  }
  console.log(userID, user.email, user.username);
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
        // generate ID  
        // use id to check future saved logins
        let userID = new mongoose.Types.ObjectId().toHexString();
        user.user_token = userID;
        await user.save();
        req.session.userID = userID;
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
    console.log(error);
    return res.status(500).json("error");
  }
});

router.post('/logout', (req, res) => {
  req.session.destroy();
  res.status(200).json('logout success');
})

router.post('/register', checkDuplicateUser, async (req, res) => {
  const password = bcrypt.hashSync(req.body.password, 10);
  const user = new User({
    registerIP: req.ip,
    email: req.body.email.toLowerCase(),
    username: req.body.username,
    password: password,
    user_token: new mongoose.Types.ObjectId().toHexString(),
  });
  await user.save();
  console.log('new user registered: ' + req.body.email);
  res.status(201).json({message: 'registered'});
});

router.get('/posts', checkLoggedIn, async (req, res) => {
  try {
    const [user] = await User.find({user_token: req.session.userID});
    const userPosts = await Post.find({_id: { $in: user.posts}});
    res.status(200).json(userPosts);
  } catch (error) {
    console.log('user posts: ', error);
  }
});

router.post('/change/:type', checkLoggedIn, async (req, res) => {
  if(req.params.type === 'Password' || req.params.type === 'Email') {
    if(req.body.newItem === req.body.checkItem) {
      try {
        const [user] = await User.find({user_token: req.session.userID});
        if(user) {
          if(req.params.type === 'Password') {
            if(bcrypt.compareSync(req.body.oldItem, user.password)) {
              const hashedPassword = bcrypt.hashSync(req.body.newItem, 10);
              await User.findByIdAndUpdate(user._id, {
                password: hashedPassword
              });
              res.status(200).json('Successful Password change');
            } else {
              res.status(409).json('The Password you entered is incorrect')
            }
          } else if( req.params.type === 'Email') {
            if(req.body.oldItem.toLowerCase() === user.email) {
              await User.findByIdAndUpdate(user._id, {
                email: req.body.newItem
              });
              res.status(200).json('Successful Email change');
            } else {
              res.status(409).json('The Email you entered is incorrect')
            }
          }
        }
      } catch (error) {
        console.log('change: ', error)
      }
    } else {
      res.status(409).json(`The ${req.params.type}s do not match`);
    }
  } else {
    // not possible
  }
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
      //user with element exists
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