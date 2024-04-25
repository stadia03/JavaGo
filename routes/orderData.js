const express = require('express');
const router = express.Router();

const Order = require('../models/Orders');

router.get('/hi', (req, res) => {
  res.send("Hello");
});

router.post('/orderData', async (req, res) => {
  let data = req.body.order_data;

  await data.splice(0, 0, { Order_date: req.body.order_date }); // Corrected typo in req.body.order_Date

  let eId = await Order.findOne({ 'email': req.body.email });

  console.log(eId);

  if (eId === null) {
    try {
      await Order.create({
        email: req.body.email,
        order_data: [data]
      });
      res.json({ success: true });
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Server Error: " + error.message); // Corrected error handling
    }
  } else {
    try {
      await Order.findOneAndUpdate({ email: req.body.email }, { $push: { order_data: data } });
      res.json({ success: true });
    } catch (error) {
      res.status(500).send("Server Error: " + error.message); // Corrected error handling
    }
  }
});

router.post('/myOrderData', async (req, res) => { // Corrected route path
  try {
    let myData = await Order.findOne({ 'email': req.body.email });
    res.json({ orderData: myData });
  } catch (error) {
    res.status(500).send("Server Error: " + error.message); // Corrected error handling
  }
});

module.exports = router;
