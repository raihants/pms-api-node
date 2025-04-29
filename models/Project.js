const db = require('../config/db');

const Project = {
  getAll: async () => {
    const [rows] = await db.query('SELECT * FROM projects');
    return rows;
  },

  create: async (projectData) => {
    const {
      name,
      description,
      start_date,
      end_date,
      status,
      budget,
      manager_id
    } = projectData;

    const [result] = await db.query(
      `INSERT INTO projects (name, description, start_date, end_date, status, budget, manager_id)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [name, description, start_date, end_date, status, budget, manager_id]
    );

    return { id: result.insertId, ...projectData };
  }
};

module.exports = Project;
