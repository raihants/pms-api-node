const db = require('../config/db');

const Task = {
  getAll: async () => {
    const [rows] = await db.query('SELECT * FROM tasks');
    return rows;
  },
};

module.exports = Task;
