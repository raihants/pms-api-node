const Log = require('../models/Log');

exports.getAllLogs = (req, res) => {
  Log.getAll((err, data) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(data);
  });
};
