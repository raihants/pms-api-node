const Team = require('../models/Team');

exports.getAllTeams = async (req, res) => {
  const{id} = req.params
  try {
    const data = await Team.getAll(id);
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

exports.create = async (req, res) => {
  const {name, description, project_id} = req.body;

  try {
    const data = await Team.create({name, description, project_id});
    res.status(201).json({ message: 'Team created successfully', team: data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
