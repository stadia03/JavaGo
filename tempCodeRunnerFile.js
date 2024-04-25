const express = require('express')
const mongoose = require('mongoose')
const app = express()
const port = 3000
require('dotenv').config();
const mongoDb=process.env.mongoDbkeys;
console.log(mongoDb);

mongoose.connect(mongoDb)
  .then(() => {
    console.log('Successfully Connected to MongoDB');
    app.listen(4000, () => {
      console.log('Listening on port 4000');
    });
  })
  .catch((err) => {
    console.log('Some issues regarding connection: ' + err);
  });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
