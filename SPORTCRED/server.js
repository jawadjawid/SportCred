const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const items = require('./routes/api/items')
const app = express();
app.use(bodyParser.json());

const db = require('./config/keys').mongoURI;
mongoose.connect(db)
    .then(()=> console.log('Mongo Connected...'))
    .catch(err => console.log(err));

app.use('/api/register', items);
const port = 5000;
app.listen(port, () => console.log('Server started at port ${port}'));