// CreateUser route file
const express = require('express');
const router = express.Router();
const User = require('../models/User');

const {body , validationResult} = require('express-validator');



router.post('/createuser', 
[
  body('email','Invalid email address*').isEmail(),
  body('name','Minimum 5 characters required*').isLength({min:5}),
  body('password','Minimum 5 characters required*').isLength({min:5})
],
async (req, res) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.status(400).json({errors: errors.array()});
  }
  
  try {
    await User.create({
      name: req.body.name,
      password: req.body.password,
      email: req.body.email,
      location: req.body.location
    });
    res.json({ success: true });
  }
  catch (err) {
    console.log(err);
    res.json({ success: false });
  }
});

module.exports = router;
