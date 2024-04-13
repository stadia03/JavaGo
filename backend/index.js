// main file (app.js)
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 6000;
require('dotenv').config();

const mongoDB = require('./db');
mongoDB();

app.use(express.json());

app.listen(port, () => {
  console.log(`Node server running on ${port}`);
});

app.use('/users', require("./routes/CreateUser"));
