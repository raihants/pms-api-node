// index.js
const express = require('express');
const dotenv = require('dotenv');
const apiRoutes = require('./routes/api');

dotenv.config();

const app = express();
app.use(express.json()); // Biar bisa baca JSON
app.use('/api', apiRoutes); // Akses semua endpoint via /api

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
