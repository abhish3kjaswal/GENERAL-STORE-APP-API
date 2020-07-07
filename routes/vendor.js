const express = require('express');
const { check, validationResult } = require('express-validator/check');

const router = express.Router();
const bcrypt = require('bcryptjs');
const Vendor = require('../models/Vendor');
const VendorList = require('../models/VendorList');

const config = require('config');
const jwt = require('jsonwebtoken');
const secret = config.get('jwtSecret');
const auth = require('../middleware/auth');
//@route  post /vendor/register
//description vendor registration
router.post(
  '/register',
  [
    check('mobile', 'please enter a valid mobile number').not().isEmpty(),
    check(
      'password',
      'please enter a valid password minimum length 6 and maximum length 10'
    ).isLength({
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

    const { mobile, password } = req.body;

    try {
      //see if vendor already exists
      let vendor = await Vendor.findOne({
        mobile,
      });
      if (vendor) {
        res.status(400).json({
          errors: [
            {
              msg: 'vendor already exists',
            },
          ],
        });
      }
      vendor = new Vendor({
        mobile,
        password,
      });

      const salt = await bcrypt.genSalt(10);
      vendor.password = await bcrypt.hash(password, salt);

      await vendor.save();

      //cretaing payload
      const payload = {
        vendor: {
          id: vendor.id,
        },
      };
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

//@route  post /vendor/login
//description vendor login
router.post(
  '/login',
  [
    check('mobile', 'please enter a valid mobile number').not().isEmpty(),
    check(
      'password',
      'please enter a valid password minimum length 6 and maximum length 10'
    ).exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    const { mobile, password } = req.body;

    try {
      //see if vendor  exists
      let vendor = await Vendor.findOne({
        mobile,
      });
      if (!vendor) {
        res.status(400).json({
          errors: [
            {
              msg: 'Invalid mobile no or password',
            },
          ],
        });
      }

      const isMatch = await bcrypt.compare(password, vendor.password);
      if (!isMatch) {
        res.status(400).json({
          errors: [
            {
              msg: 'Invalid mobile no or password ',
            },
          ],
        });
      }

      //creating payload
      const payload = {
        vendor: {
          id: vendor.id,
        },
      };
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

// getting vendor list only for authorized vendors

router.get('/list', auth, async (req, res) => {
  const items = [
    {
      Title: 'apple',
      decription: 'some description',
      price: 123,
    },
    {
      Title: 'mango',
      decription: 'some description',
      price: 123,
    },
    {
      Title: 'banana',
      decription: 'some description',
      price: 123,
    },
  ];
  res.send(items);
});

module.exports = router;
