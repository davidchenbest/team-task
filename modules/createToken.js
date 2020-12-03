const jwt = require('jsonwebtoken');

const maxTime = 60 * 60;
function createToken(id) {
  return jwt.sign({ id }, process.env.SECRET, {
    expiresIn: maxTime,
  });
}

module.exports = createToken;
