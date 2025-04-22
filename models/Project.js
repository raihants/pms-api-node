const db = require('../config/db');

const Project = {
  getAll: (cb) => db.query('SELECT * FROM projects', cb),
};

module.exports = Project;
