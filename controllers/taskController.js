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

exports.createTask = async (req, res) => {
  const { 
      project_id,
      name,
      description,
      priority,
      start_date,
      end_date,
      status,
      user_id } = req.body;

  // Validasi sederhana
  if (!project_id || !name || !start_date || !end_date || !status || !user_id) {
    return res.status(400).json({ error: 'User, Name, start_date, end_date, and status are required' });
  }

  try {
    const newTask = await Task.create({
      project_id,
      name,
      description,
      priority,
      start_date,
      end_date,
      status,
      user_id
    });

    res.status(201).json({ message: 'Task created successfully', task: newTask });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateTask = async (req, res) => {
  const{ id } = req.params;
  const { 
      project_id,
      name,
      description,
      priority,
      start_date,
      end_date,
      status,
      user_id } = req.body;

  try {
    const existing = await Task.getById(id);
    if (!existing) {
      return res.status(404).json({ error: 'Project not found' });
    }

    const updatedTask = await Task.update(id,{
      project_id,
      name,
      description,
      priority,
      start_date,
      end_date,
      status,
      user_id
    });

    res.status(201).json({ message: 'Task updated successfully', task: updatedTask });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }

  exports.deleteTask = async (req, res) => {
  const { id } = req.params;

  try {
    const existing = await Task.getById(id);
    if (!existing) {
      return res.status(404).json({ error: 'Task not found' });
    }

    await Task.delete(id);
    res.json({ message: 'Task deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
};
