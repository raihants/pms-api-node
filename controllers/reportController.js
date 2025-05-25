const { json } = require('express');
const Report = require('../models/Report');

exports.getByProject = async (req, res) => {
  const { id } = req.params
    try {
      const data = await Report.getByProject(id);
      res.json(data);
    } catch (err){
      res.status(500).json({ error:err.message });
    }
};

exports.generateForProject = async (req,res) => {
  const { id } = req.params
  try {
    const result = await ProjectReport.generateForProject(id);
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Gagal generate laporan project' });
  }
}
