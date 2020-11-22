const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const session = require('express-session');
const MongoDBStore = require("connect-mongodb-session")(session);

const profiles = require('./routes/api/profile');
const posts = require('./routes/api/post');
const games = require('./routes/api/schedule');
const predicts = require('./routes/api/prediction');
const debates = require('./routes/api/debate');
const trivia = require('./routes/api/trivia');

const app = express();
app.use(bodyParser.json());

// var routesArray = ['/login','/','/profile']
// Create a session cookie
// app.use(routesArray,session({

  
  
  
const db = require('./config/keys').mongoURI;
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
    .then(()=> console.log('Mongo Connected...'))
    .catch(err => console.log(err));

const mongoDBstore = new MongoDBStore({
    uri: db,
    collection: "mySessions"
    });
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(session({
    secret: 'pisession',
    resave: true,
    saveUninitialized: false,
    store: mongoDBstore,
    cookie: {
      maxAge: 1000 * 60 * 60 * 3,
      sameSite: false,
      secure: false,
    }
  }));

app.use('/api/profile', profiles);
app.use('/api/post', posts);
app.use('/api/schedule', games);
app.use('/api/prediction', predicts);
app.use('/api/debate', debates)
app.use('/api/trivia', trivia);

const port = 5000;
app.listen(port, () => console.log(`Server started at port ${port}`));

