const Task = require('../models/Task');

exports.getAllTasks = async (req, res) => {
  try {
    const data = await Task.getAll();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getByIdProjects = async (req, res) => {
  const {id} = req.params;

  try {
    const data = await Task.getById(id);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
