const db = require('../config/db');

const Team = {
  getAll: async () => {
    const [rows] = await db.query('SELECT * FROM teams');
    return rows;
  },
};

module.exports = Team;
