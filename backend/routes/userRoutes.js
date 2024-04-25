// CreateUser route file
const express = require('express');
const router = express.Router();
const User = require('../models/User');

const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

const bcrypt = require('bcryptjs');

router.get('/', async (req, res) => {
  res.status(200).send('Hello World!');
});

const jwtSecret = 'MyNameIsGaurabAndThisIsMyFirstMernStackProjectAlsoIAmVeryExcited';


router.post('/createuser',
  [
    body('email', 'Invalid email address*').isEmail(),
    body('name', 'Minimum 5 characters required*').isLength({ min: 5 }),
    body('password', 'Minimum 5 characters required*').isLength({ min: 5 })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // bcrypt hashing 
    const salt = await bcrypt.genSalt(10);
    let secure_password = await bcrypt.hash(req.body.password,salt);

    try {
      await User.create({
        name: req.body.name,
        password: secure_password ,
        email: req.body.email,
        location: req.body.location
      });
      res.json({ success: true });
    }
    catch (err) {
     
      res.json({ success: false });
    }
  });



router.post('/loginuser', [
  body('email', 'Invalid credentials*').isEmail(),
  body('password', 'Invalid credentials').isLength({ min: 5 })
], async (req, res) => {
 
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  let email = req.body.email;


  try {
    let userData = await User.findOne({ email });
    if (!userData) {
      return res.status(400).json({ errors: "User Not Found!" })
    }
    const pwdCompare = await bcrypt.compare(req.body.password,userData.password);

    if (!pwdCompare) {
      return res.status(400).json({ errors: "Invalid credentials" })
    }
    
    const data = {
      user :{
        id: userData.id
      }
    }
    const authToken= jwt.sign(data,jwtSecret);
    return res.json({ success: true,authToken:authToken });
  }
  catch (err) {
    console.log(err);
    res.json({ success: false });
  }
});



module.exports = router;
