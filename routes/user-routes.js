require('dotenv').config();
const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const { register, login, getUserInfo, getUserList } = require('../controllers/user-controller');

router.post('/register', register);
router.post('/login', login);

router.get('/getUserInfo', auth, getUserInfo);
router.get('/getUserList', auth, getUserList);



module.exports = router;