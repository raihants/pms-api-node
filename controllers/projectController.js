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

