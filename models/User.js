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
  }
};

module.exports = User;
