const User = require('../models/User');

exports.getAllUsers = (req, res) => {
  User.getAll((err, data) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(data);
  });
};

const jwt = require('jsonwebtoken');
const db = require('../config/db');
require('dotenv').config();

exports.login = (req, res) => {
  const { username, password } = req.body;

  db.query('SELECT * FROM users WHERE username = ? AND password = ?', [username, password], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(401).json({ error: 'Invalid credentials' });

    const user = results[0];
    const token = jwt.sign({ id: user.id, username: user.username, role: user.role}, process.env.JWT_SECRET, { expiresIn: '2h' });

    res.json({ token });
  });
};