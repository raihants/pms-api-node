const Project = require('../models/Project');

// GET /projects
exports.getAllProjects = async (req, res) => {
  try {
    const data = await Project.getAll();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllProjectsByUsersId = async (req, res) => {
  const { id } = req.params
  try {
    const data = await Project.getAllByUserId(id);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET /projects/:id
exports.getProjectById = async (req, res) => {
  const { id } = req.params;

  try {
    const project = await Project.getById(id);
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    res.json(project);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST /projects
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

// PUT /projects/:id
exports.updateProject = async (req, res) => {
  const { id } = req.params;
  const { name, description, start_date, end_date, status, budget, manager_id } = req.body;

  try {
    const existing = await Project.getById(id);
    if (!existing) {
      return res.status(404).json({ error: 'Project not found' });
    }

    const updatedProject = await Project.update(id, {
      name,
      description,
      start_date,
      end_date,
      status,
      budget,
      manager_id
    });

    res.status(200).json({ message: 'Project updated successfully', project: updatedProject });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE /projects/:id
exports.deleteProject = async (req, res) => {
  const { id } = req.params;

  try {
    const existing = await Project.getById(id);
    if (!existing) {
      return res.status(404).json({ error: 'Project not found' });
    }

    await Project.delete(id);
    res.json({ message: 'Project deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
