const User = require('../models/User');

exports.getAllUsers = async (req, res) => {
  try {
    const data = await User.getAll();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getUsersById = async (req, res) => {
  const { id } = req.params; // Ambil ID dari parameter URL
  try {
    const data = await User.getById(id); // Asumsikan ada method getById di model User
    if (!data) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const jwt = require('jsonwebtoken');
const db = require('../config/db');
require('dotenv').config();

exports.register = async (req, res) => {
  const { username, password, nama_lengkap, role } = req.body;

  // Validasi field kosong
  if (!username || !password || !nama_lengkap || !role) {
    return res.status(400).json({ error: 'Semua field harus diisi' });
  }

  try {
    // Cek jika username sudah digunakan
    const existingUser = await User.findByUsername(username);
    if (existingUser) {
      return res.status(409).json({ error: 'Username sudah digunakan' });
    }

    console.log("register", username, password, nama_lengkap, role);

    // Buat user baru
    const userId = await User.create({ username, password, nama_lengkap, role });    

    res.status(201).json({
      message: 'Registrasi berhasil',
      user: {
        id: userId,
        username,
        nama_lengkap,
        role
      }
    });
  } catch (err) {
    console.error('Register error:', err.message);
    res.status(500).json({ error: 'Gagal mendaftar, terjadi kesalahan server' });
  }
};


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
    const userWithoutPassword = {
      id: user.id,
      username: user.username,
      nama_lengkap: user.nama_lengkap,
      role: user.role
    };

    res.status(200).json({ token, user: userWithoutPassword });
  } catch (err) {
    console.error('Login error:', err.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getUsersByProjectID = async (req,res) => {
  const{id} = req.params;
  try {
    const data = await User.getUsersByProjectID(id);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
