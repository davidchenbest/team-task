const jwt = require('jsonwebtoken');
require('dotenv').config();

function jwtAuth(req, res, next) {
  const { authorization } = req.headers;
  if (!authorization) return res.redirect('/');
  let jwtToken = authorization.split(' ')[1];
  if (jwtToken) {
    jwt.verify(jwtToken, process.env.SECRET, (err, decodedToken) => {
      if (err) res.redirect('/');
      else {
        next();
      }
    });
  } else res.redirect('/');
}

module.exports = jwtAuth;
