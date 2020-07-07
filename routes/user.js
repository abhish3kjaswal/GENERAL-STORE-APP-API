const express = require('express');
const { check, validationResult } = require('express-validator/check');

const bcrypt = require('bcryptjs');

const router = express.Router();

const User = require('../models/User');

//@route  get /user/register
//@description register user
router.post(
  '/register',
  [
    check('username', 'Username is required').not().isEmpty(),
    check('password', 'please enter a valid password').isLength({
      min: 6,
      max: 10,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    const { username, password } = req.body;

    try {
      //see if user already exists
      let user = await User.findOne({
        username,
      });
      if (user) {
        res.status(400).json({
          errors: [
            {
              msg: 'user already exists',
            },
          ],
        });
      }

      user = new User({
        username,
        password,
      });

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      await user.save();

      res.send('user registered');
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;
