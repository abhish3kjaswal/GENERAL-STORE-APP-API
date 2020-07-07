const express = require('express');


const router = express.Router();

//@route  get /auth

router.get('/', (req, res) => {
    res.send("Auth route");
});
module.exports = router;