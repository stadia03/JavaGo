const express = require('express');
const router = express.Router();

router.post('/foodData', (req, res) => {
  try {
    // Send an object containing both food_items and foodCategory
    res.send([global.food_items, global.foodCategory]);

    // console.log(global.food_items);
  } catch (error) {
    console.error(error.message);
    res.send("Server Error");
  }
});

module.exports = router;
