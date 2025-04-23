const db = require('../config/db');

const Report = {
  getAll: async () => {
    const [rows] = await db.query('SELECT * FROM reports');
    return rows;
  },
};

module.exports = Report;
