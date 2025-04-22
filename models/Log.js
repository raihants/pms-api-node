const db = require('../config/db');

const Log = {
  getAll: (cb) => db.query('SELECT * FROM logs', cb),
};

module.exports = Log;
