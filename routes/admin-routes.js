const express = require('express');
const router = express.Router();

// User routes for admin
// GET /admin/users - get all users
// GET /admin/users/:id - get user by id
// POST /admin/users - create user
// PUT /admin/users/:id - update user
// DELETE /admin/users/:id - delete user

// Project routes for admin
// GET /admin/projects - get all projects
// GET /admin/projects/:id - get project by id
// POST /admin/projects - create project
// PUT /admin/projects/:id - update project
// DELETE /admin/projects/:id - delete project

// Section routes for admin
// GET /admin/sections - get all sections
// GET /admin/sections/:id - get section by id
// POST /admin/sections - create section
// PUT /admin/sections/:id - update section
// DELETE /admin/sections/:id - delete section

// Task routes for admin
// GET /admin/tasks - get all tasks
// GET /admin/tasks/:id - get task by id
// POST /admin/tasks - create task
// PUT /admin/tasks/:id - update task
// DELETE /admin/tasks/:id - delete task

// user model
const User = require('../models/User');
// project model
const Project = require('../models/Project');
// section model
const Section = require('../models/Section');
// task model
const Task = require('../models/Task');

const { getAllUsers, getUserById, createUser, updateUser, deleteUser } = require('../controllers/admin-controller');
const { getAllProjects, getProjectById, createProject, updateProject, deleteProject } = require('../controllers/admin-controller');
const { getAllSections, getSectionById, createSection, updateSection, deleteSection } = require('../controllers/admin-controller');
const { getAllTasks, getTaskById, createTask, updateTask, deleteTask } = require('../controllers/admin-controller');

// Middleware to set headers
router.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Expose-Headers', 'X-Total-Count, Content-Range');
    next();
});

// User routes for admin
// GET /admin/users - get all users
router.get('/users', getAllUsers);
// GET /admin/users/:id - get user by id
router.get('/users/:id', getUserById);
// POST /admin/users - create user
router.post('/users', createUser);
// PUT /admin/users/:id - update user
router.put('/users/:id', updateUser);
// DELETE /admin/users/:id - delete user
router.delete('/users/:id', deleteUser);

// Project routes for admin
// GET /admin/projects - get all projects
router.get('/projects', getAllProjects);
// GET /admin/projects/:id - get project by id
router.get('/projects/:id', getProjectById);
// POST /admin/projects - create project
router.post('/projects', createProject);
// PUT /admin/projects/:id - update project
router.put('/projects/:id', updateProject);
// DELETE /admin/projects/:id - delete project
router.delete('/projects/:id', deleteProject);

// Section routes for admin
// GET /admin/sections - get all sections
router.get('/sections', getAllSections);
// GET /admin/sections/:id - get section by id
router.get('/sections/:id', getSectionById);
// POST /admin/sections - create section
router.post('/sections', createSection);
// PUT /admin/sections/:id - update section
router.put('/sections/:id', updateSection);
// DELETE /admin/sections/:id - delete section
router.delete('/sections/:id', deleteSection);

// Task routes for admin
// GET /admin/tasks - get all tasks
router.get('/tasks', getAllTasks);
// GET /admin/tasks/:id - get task by id
router.get('/tasks/:id', getTaskById);
// POST /admin/tasks - create task
router.post('/tasks', createTask);
// PUT /admin/tasks/:id - update task
router.put('/tasks/:id', updateTask);
// DELETE /admin/tasks/:id - delete task
router.delete('/tasks/:id', deleteTask);

module.exports = router;
