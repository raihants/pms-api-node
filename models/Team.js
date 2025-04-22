const db = require('../config/db');

const Team = {
  getAll: (cb) => db.query('SELECT * FROM teams', cb),
};

module.exports = Team;
