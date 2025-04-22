const Task = require('../models/Task');

exports.getAllTasks = (req, res) => {
  Task.getAll((err, data) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(data);
  });
};
