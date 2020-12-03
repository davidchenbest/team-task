const bcrypt = require('bcrypt');

async function bcryptString(string) {
  const salt = await bcrypt.genSalt();
  return await bcrypt.hash(string, salt);
}

module.exports = bcryptString;
