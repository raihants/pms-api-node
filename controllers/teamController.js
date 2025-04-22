const Team = require('../models/Team');

exports.getAllTeams = (req, res) => {
  Team.getAll((err, data) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(data);
  });
};
