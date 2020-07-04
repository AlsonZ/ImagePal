if(process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
const express = require('express');
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');
const session = require('express-session');
const postsRouter = require('./routes/posts');
const userRouter = require('./routes/users');

const app = express();

mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true, useUnifiedTopology: true})
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to Database'));

app.use(express.json());
app.use(fileUpload());
app.use(session({
  secret: process.env.SECRET_HASH,
  resave: false,
  saveUninitialized: false,
  proxy: true,
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    // secure: false,
    maxAge: 1000 * 60 * 60 * 24 * 7 // = 7 days 
  }
}));
app.use('/API/posts', postsRouter);
app.use('/API/users', userRouter);


if(process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  })
}

const port = process.env.PORT || 3001;
app.listen(port, () => console.log('Server Started'));