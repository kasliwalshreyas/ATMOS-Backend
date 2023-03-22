require('dotenv').config();
const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const { register, login, getUserInfo, getUserList, addProjectToFavorite, removeProjectFromFavorite } = require('../controllers/user-controller');

router.post('/register', register);
router.post('/login', login);

router.get('/getUserInfo', auth, getUserInfo);
router.get('/getUserList', auth, getUserList);
router.put('/addProjectToFavorite', auth, addProjectToFavorite);
router.put('/removeProjectFromFavorite', auth, removeProjectFromFavorite);



module.exports = router;