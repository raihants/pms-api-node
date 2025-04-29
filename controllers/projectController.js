const Project = require('../models/Project');

exports.getAllProjects = async (req, res) => {
  console.log('User from token', req.user);

  try {
    const data = await Project.getAll();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createProject = async (req, res) => {
  const { name, description, start_date, end_date, status, budget, manager_id } = req.body;

  // Validasi sederhana
  if (!name || !start_date || !end_date || !status) {
    return res.status(400).json({ error: 'Name, start_date, end_date, and status are required' });
  }

  try {
    const newProject = await Project.create({
      name,
      description,
      start_date,
      end_date,
      status,
      budget,
      manager_id
    });

    res.status(201).json({ message: 'Project created successfully', project: newProject });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
