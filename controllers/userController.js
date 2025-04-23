const User = require('../models/User');

exports.getAllUsers = async (req, res) => {
  try {
    const data = await User.getAll();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const jwt = require('jsonwebtoken');
const db = require('../config/db');
require('dotenv').config();

exports.login = async (req, res) => {
  console.log('Login route hit');
  console.log('Request body:', req.body);

  const { username, password } = req.body;

  try {
    const [results] = await db.query(
      'SELECT * FROM users WHERE username = ? AND password = ?',
      [username, password]
    );

    if (results.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const user = results[0];
    const token = jwt.sign(
      { id: user.id, username: user.username, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '2h' }
    );

    res.status(200).json({token, user});
  } catch (err) {
    console.error('Login error:', err.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};
