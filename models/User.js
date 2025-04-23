const db = require('../config/db');

const User = {
  getAll: async () => {
    const [rows] = await db.query('SELECT * FROM users');
    return rows;
  },
  getById: async (id) => {
    const [rows] = await db.query('SELECT FROM users where id = ?', [id])
    return rows[0]
  }
};

module.exports = User;
