const jwt = require('jsonwebtoken');
const config = require('config');
const secret = config.get('jwtSecret');

module.exports = function (req, res, next) {
  //getting token from header

  const token = req.header('x-auth-token');

  //checking if not token

  if (!token) {
    return res.status(401).json({ msg: 'user is not authorized' });
  }

  //verifying token

  try {
    const decoded = jwt.verify(token, secret);

    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'user is not authorized' });
  }
};
