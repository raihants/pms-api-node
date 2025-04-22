const db = require('../config/db');

const Report = {
  getAll: (cb) => db.query('SELECT * FROM reports', cb),
};

module.exports = Report;
