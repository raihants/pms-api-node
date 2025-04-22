const db = require('../config/db');

const User = {
  getAll: (cb) => db.query('SELECT * FROM users', cb),
};

module.exports = User;
