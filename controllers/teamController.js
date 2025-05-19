const Team = require('../models/Team');

exports.getAllTeams = async (req, res) => {
  const{id} = req.params
  try {
    const data = await Team.getAll();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getUsersByIDProject = async (req, res) => {
  const {id} = req.params;

  try {
    const data = await Team.getUsersByProjectID(id);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
