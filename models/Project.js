const db = require('../config/db');

const Project = {
  getAll: async () => {
    const [rows] = await db.query('SELECT * FROM projects');
    return rows;
  },

  getAllByUserId: async (user_id) => {
    const [rows] = await db.query('SELECT id,name,description,status,start_date,end_date,budget FROM projects_users where user_id = ?', user_id);
    return rows[0];
  },

  getById: async (id) => {
    const [rows] = await db.query('SELECT * FROM projects WHERE id = ?', [id]);
    return rows[0]; // Ambil satu hasil karena ID unik
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
  },

  update: async (id, projectData) => {
    const {
      name,
      description,
      start_date,
      end_date,
      status,
      budget,
      manager_id
    } = projectData;

    await db.query(
      `UPDATE projects SET name = ?, description = ?, start_date = ?, end_date = ?, status = ?, budget = ?, manager_id = ?
       WHERE id = ?`,
      [name, description, start_date, end_date, status, budget, manager_id, id]
    );

    return { id, ...projectData };
  },

  delete: async (id) => {
    await db.query('DELETE FROM projects WHERE id = ?', [id]);
    return { message: 'Project deleted successfully' };
  }
};

module.exports = Project;
