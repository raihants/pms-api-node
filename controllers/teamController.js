const Team = require('../models/Team');

exports.getAllTeams = async (req, res) => {
  try {
    const data = await Team.getAll();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
