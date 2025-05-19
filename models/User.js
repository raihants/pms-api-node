const db = require('../config/db');

const User = {
  getAll: async () => {
    const [rows] = await db.query('SELECT * FROM users');
    return rows;
  },

  getById: async (id) => {
    const [rows] = await db.query('SELECT * FROM users WHERE id = ?', [id]);
    return rows[0]; // Ambil hanya satu user
  },

  create: async ({ username, password, nama_lengkap, role }) => {
    const [result] = await db.query(
      'INSERT INTO users (username, password, name, role) VALUES (?, ?, ?, ?)',
      [username, password, nama_lengkap, role]
    );
    return result.insertId;
  },

  findByUsername: async (username) => {
    const [rows] = await db.query('SELECT * FROM users WHERE username = ?', [username]);
    return rows[0];
  },

  getUsersByProjectID: async (projectId) => {
  const [rows] = await db.query(`
    SELECT u.id as user_id, u.name as user_name, t.*
    FROM users u
    JOIN teams t ON u.team_id = t.id
    WHERE t.project_id = ?`, [projectId]);
  return rows;
  },

  updateUser: async (id, user) => {
  const { username, password, nama_lengkap, role, team_id } = user;

  const [result] = await db.query(
    'UPDATE users SET username = ?, password = ?, name = ?, role = ?, team_id = ? WHERE id = ?',
    [username, password, nama_lengkap, role, team_id, id]
  );

  return result.affectedRows > 0;
  }

};

module.exports = User;
