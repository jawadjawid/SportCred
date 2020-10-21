const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const session = require('express-session');

const profiles = require('./routes/api/profile');

const app = express();
app.use(bodyParser.json());


// Create a session cookie
app.use(session({
    secret: 'pisession',
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 600000,
      httpOnly: true
    }
  }));
  
const db = require('./config/keys').mongoURI;
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(()=> console.log('Mongo Connected...'))
    .catch(err => console.log(err));

app.use('/api/profile', profiles);

const port = 5000;
app.listen(port, () => console.log('Server started at port '+{port}));

