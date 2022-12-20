const bcrypt = require('bcrypt');

const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt();
  const hash = bcrypt.hash(password, salt);
  return hash;
}

module.exports = { hashPassword }