const express = require('express');
const { check, validationResult } = require('express-validator/check');

const bcrypt = require('bcryptjs');

const router = express.Router();

const User = require('../models/User');

const jwt = require('jsonwebtoken');

const config = require('config');

const secret = config.get('jwtSecret');

const auth = require('../middleware/auth');

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
      // //create payload for jwt token with user id
      // const payload = {
      //   user: {
      //     id: user.id,
      //   },
      // };

      // //sign jwt token with payload and secret
      // jwt.sign(payload, secret, { expiresIn: 360000 }, (err, token) => {
      //   if (err) throw err;
      //   res.json({ token });
      // });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

//@route  post /user/login
//@description login and authenticate user
router.post(
  '/login',
  [
    check('username', 'Username is required').not().isEmpty(),
    check('password', 'password is required ').exists(),
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
      //see if user exists
      let user = await User.findOne({
        username,
      });
      if (!user) {
        return res.status(400).json({
          errors: [
            {
              msg: 'Invalid Username or password',
            },
          ],
        });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({
          errors: [
            {
              msg: 'Invalid Username or password',
            },
          ],
        });
      }

      //create payload for jwt token with user id
      const payload = {
        user: {
          id: user.id,
        },
      };

      //sign jwt token with payload and secret
      jwt.sign(payload, secret, { expiresIn: 360000 }, (err, token) => {
        if (err) throw err;
        res.json({ token });
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);
module.exports = router;
