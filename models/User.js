const db = require('../config/db');

const User = {
  getAll: async () => {
    const [rows] = await db.query('SELECT * FROM users');
    return rows;
  },
};

module.exports = User;
