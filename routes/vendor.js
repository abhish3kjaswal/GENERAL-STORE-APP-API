const express = require('express');
const { check, validationResult } = require('express-validator/check');

const router = express.Router();
const bcrypt = require('bcryptjs');
const Vendor = require('../models/Vendor');
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

      res.send('Vendor registered');
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);
module.exports = router;
