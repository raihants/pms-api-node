const Report = require('../models/Report');

exports.getAllReports = (req, res) => {
  Report.getAll((err, data) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(data);
  });
};
