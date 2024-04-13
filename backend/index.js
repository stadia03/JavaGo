// main file (app.js)
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 7000;
require('dotenv').config();

const mongoDB = require('./db');
mongoDB();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(express.json());

app.listen(port, () => {
  console.log(`Node server running on ${port}`);
});

app.use('/', require("./routes/userRoutes"));
