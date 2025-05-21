const db = require('../config/db');

const Team = {
  getAll: async (projectID) => {
    const [rows] = await db.query('SELECT * FROM teams where project_id = ?',[projectID]);
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
  },

  create: async (teamData) => {
    const {
      name,
      description,
      project_id 
    } = teamData;

    if(teamData != null){
      const [result] = await db.query(
      'INSERT INTO teams (name,description,project_id) VALUES (?,?,?)',
      [name,description,project_id]
    );

    return { id: result.insertId, ...teamData };
    }
  }
}

module.exports = Team;
