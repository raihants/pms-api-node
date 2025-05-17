const db = require('../config/db');

const Team = {
  getAll: async () => {
    const [rows] = await db.query('SELECT * FROM teams');
    return rows;
  },

  getUsersByProjectID: async (projectId) => {
  const [rows] = await db.query(`
    SELECT u.id, u.name
    FROM users u
    JOIN teams t ON u.team_id = t.id
    WHERE t.project_id = ?
  `, [projectId]);
  return rows;
}

};

module.exports = Team;
