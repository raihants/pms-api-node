const express = require('express');
const router = express.Router();

const log = require('../controllers/logController');
const project = require('../controllers/projectController');
const report = require('../controllers/reportController');
const task = require('../controllers/taskController');
const team = require('../controllers/teamController');
const user = require('../controllers/userController');

const auth = require('../middleware/authMiddleware'); // <- auth middleware
const User = require('../models/User');

// Public route
router.post('/login', user.login);
router.post('/register', user.register);

// Protected routes
router.get('/logs', auth, log.getAllLogs);
router.get('/logs/:id', auth, log.getByProjectId);

router.get('/projects', auth, project.getAllProjects);
router.post('/projects', auth, project.createProject);
router.put('/projects/:id', auth, project.updateProject);
router.delete('/projects/:id', auth, project.deleteProject);
router.get('/projects/:id', auth, project.getProjectById);

router.get('/reports', auth, report.getAllReports);

router.get('/tasks', auth, task.getAllTasks);
router.get('/tasks/:id', auth, task.getByIdProjects);
router.post('/tasks', auth, task.createTask);
router.put('/tasks/:id', auth, task.updateTask);
router.delete('/tasks/:id', auth, task.deleteTask);

router.get('/teams', auth, team.getAllTeams);
router.get('/teams/:id', auth, team.getUsersByIDProject);
router.get('/teams-users/:id', auth, User.getUsersByIDProject);

router.get('/users', auth, user.getAllUsers);
router.get('/users/:id', auth, user.getUsersById);



module.exports = router;
