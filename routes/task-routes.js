const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const { updateTask, deleteTask, getTaskList } = require('../controllers/task-controller');

router.use(auth);

router.post('/updateTask', updateTask);
router.delete('/deleteTask/:id', deleteTask);
router.get('/getTaskList/', getTaskList); //created by Einstein


module.exports = router;