require('dotenv').config();
const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const upload = require('../middlewares/avatarUpload');
const { register, login, getUserInfo, getUserList, uploadAvatar, updateUser } = require('../controllers/user-controller');

router.post('/register', register);
router.post('/login', login);
router.post('/uploadAvatar', auth, upload.single('avatar'), uploadAvatar);
router.post('/updateUser', auth, updateUser);

router.get('/getUserInfo', auth, getUserInfo);
router.get('/getUserList', auth, getUserList);



module.exports = router;