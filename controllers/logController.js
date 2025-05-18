const Log = require('../models/Log');

exports.getAllLogs = async (req, res) => {
  try {
    const data = await Log.getAll();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getByProjectId = async (req,res) => {
  const{id} = req.params
  try {
    const data = await Log.getByProjectId(id);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
