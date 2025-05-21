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
  const { username, password, email, nama_lengkap, role } = req.body;

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
    const userId = await User.create({ username, password, email, nama_lengkap, role });    

    res.status(201).json({
      message: 'Registrasi berhasil',
      user: {
        id: userId,
        username,
        email,
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

  const { identifier, password } = req.body; // 'identifier' bisa berupa username atau email

  try {
    const [results] = await db.query(
      `SELECT * FROM users WHERE (username = ? OR email = ?) AND password = ?`,
      [identifier, identifier, password]
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
      email: user.email,
      nama_lengkap: user.nama_lengkap,
      role: user.role
    };

    res.status(200).json({ token, user: userWithoutPassword });
  } catch (err) {
    console.error('Login error:', err.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getUsersProjectID = async (req,res) => {
  const{id} = req.params;
  try {
    const data = await User.getUsersByProjectID(id);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const { username, password, name, role, team_id } = req.body; // <--- ini yang penting

  try {
    const existing = await User.getById(id);
    if (!existing) {
      return res.status(404).json({ error: 'User not found' });
    }

    const result = await User.updateUser(id, {
      username,
      password,
      name,
      role,
      team_id
    });

    res.status(200).json({ message: 'User updated successfully', result });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

