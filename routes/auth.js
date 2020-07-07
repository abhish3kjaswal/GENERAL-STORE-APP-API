const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

//Get /auth
//Test route
router.get('/', auth, async (req, res) => {
  res.send('vendor list');
});

module.exports = router;
