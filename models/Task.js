const db = require('../config/db');

const Task = {
  getAll: (cb) => db.query('SELECT * FROM tasks', cb),
};

module.exports = Task;
