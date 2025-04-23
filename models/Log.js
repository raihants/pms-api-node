const db = require('../config/db');

const Log = {
  getAll: async () => {
    const [rows] = await db.query('SELECT * FROM logs');
    return rows;
  },
};
module.exports = Log;
