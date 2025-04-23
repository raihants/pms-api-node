const { json } = require('express');
const Report = require('../models/Report');

exports.getAllReports = async (req, res) => {
    try {
      const data = await Report.getAll();
      res.json(data);
    } catch (err){
      res.status(500).json({ error:err.message });
    }
};
