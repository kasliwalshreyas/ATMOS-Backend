const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const { updateTask, deleteTask } = require('../controllers/task-controller');

router.use(auth);

router.post('/updateTask', updateTask);
router.delete('/deleteTask/:id', deleteTask);


module.exports = router;