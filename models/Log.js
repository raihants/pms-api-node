const db = require('../config/db');

const Log = {
  getAll: async () => {
    const [rows] = await db.query('SELECT * FROM logs');
    return rows;
  },

  getByProjectId: async (project_id) => {
    const [rows] = await db.query(
      `SELECT l.*, u.name AS user_name, t.name AS task_name
       FROM logs l
       LEFT JOIN users u ON l.user_id = u.id
       LEFT JOIN tasks t ON l.task_id = t.id
       WHERE t.project_id = ?
       ORDER BY l.activity_time DESC`,
      [project_id]
    );
    return rows;
  },

  create: async ({ task_id, user_id, activity }) => {
    await db.query(
      `INSERT INTO logs (task_id, user_id, activity)
       VALUES (?, ?, ?)`,
      [task_id, user_id, activity]
    );
  },
};
module.exports = Log;
