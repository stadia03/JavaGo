const mongoose = require("mongoose")
require('dotenv').config();

const mongoDb = process.env.mongoDbkeys;

const mongoDB = async () => {
  try {
    await mongoose.connect(mongoDb);
    console.log('Successfully Connected to MongoDB');

    const fetched_data = await mongoose.connection.db.collection("food_items");
    const data = await fetched_data.find({}).toArray(); //({}) to fetch all the data
    console.log(data[0]);
  } catch (err) {
    console.log('Some issues regarding connection: ' + err);
  }
}

module.exports = mongoDB;
