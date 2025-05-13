const db = require('../config/db');

const Task = {
  getAll: async () => {
    const [rows] = await db.query('SELECT * FROM tasks');
    return rows;
  },

  getById: async (id) => {
      const [rows] = await db.query('SELECT t.project_id, t.name, t.description, t.priority, t.start_date, t.end_date, t.status, u.name FROM tasks t join users u on t.user_id = u.id where project_id = ?', [id]);
      return rows;
  },
};

module.exports = Task;
