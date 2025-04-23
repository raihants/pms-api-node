// models/Project.js
const db = require('../config/db');

const Project = {
  getAll: async () => {
    const [rows] = await db.query('SELECT * FROM projects');
    return rows;
  },
};

module.exports = Project;
