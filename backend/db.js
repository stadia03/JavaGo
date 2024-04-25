const mongoose = require("mongoose");
require('dotenv').config();

const mongoDb = process.env.mongoDbkeys;

const mongoDB = async () => {
  try {
    await mongoose.connect(mongoDb);
    console.log('Successfully Connected to MongoDB');

    // Fetch data from food_items collection
    const foodItemsCollection = await mongoose.connection.db.collection("food_items");
    const foodItemsData = await foodItemsCollection.find({}).toArray();
    global.food_items = foodItemsData;

    // Fetch data from foodCategory collection
    const foodCategoryCollection = await mongoose.connection.db.collection("foodCategory");
    const foodCategoryData = await foodCategoryCollection.find({}).toArray();
    global.foodCategory = foodCategoryData;

    // Do something with the data if needed
    // For example: console.log(foodItemsData[0]);

  } catch (err) {
    console.log('Some issues regarding connection: ' + err);
  }
}

module.exports = mongoDB;
