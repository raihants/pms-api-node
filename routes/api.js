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
router.post('/register', user.register);

// Protected routes
router.get('/logs', auth, log.getAllLogs);
router.get('/projects', auth, project.getAllProjects);
router.post('/projects', auth, project.createProject);
router.get('/reports', auth, report.getAllReports);
router.get('/tasks', auth, task.getAllTasks);
router.get('/tasks/:id', auth, task.getByIdProjects);
router.get('/teams', auth, team.getAllTeams);
router.get('/users', auth, user.getAllUsers);
router.get('/users/:id', auth, user.getUsersById);
router.put('/projects/:id', auth, project.updateProject);
router.delete('/projects/:id', auth, project.deleteProject);
router.get('/projects/:id', auth, project.getProjectById);

module.exports = router;
