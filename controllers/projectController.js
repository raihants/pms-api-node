const Project = require('../models/Project');

exports.getAllProjects = (req, res) => {
    console.log('User from token', req.user);

  Project.getAll((err, data) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(data);
  });
};
