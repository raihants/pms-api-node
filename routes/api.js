const express = require('express');
const router = express.Router();

const log = require('../controllers/logController');
const project = require('../controllers/projectController');
const report = require('../controllers/reportController');
const task = require('../controllers/taskController');
const team = require('../controllers/teamController');
const user = require('../controllers/userController');

const auth = require('../middleware/authMiddleware'); // <- auth middleware

// Public route
router.post('/login', user.login);

// Protected routes
router.get('/logs', auth, log.getAllLogs);
router.get('/projects', auth, project.getAllProjects);
router.get('/reports', auth, report.getAllReports);
router.get('/tasks', auth, task.getAllTasks);
router.get('/teams', auth, team.getAllTeams);
router.get('/users', auth, user.getAllUsers);
router.get('/users/:id', user.getUsersById);
router.get('/register', user.register);

module.exports = router;
