const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const { getChatsProject, getChatsUser, sendProjectMessage } = require('../controllers/chat-controller');
router.use(auth);

// router.post('/updateChat', updateChat);
// router.delete('/deleteChat/:id', deleteChat);
router.get('/getChats/project/:id', getChatsProject);
router.get('/getChats/user/:id', getChatsUser);
router.post('/sendMessage/Project/:id', sendProjectMessage);
// router.post('/sendMessage/user/:id', sendPersonalMessage);
// router.get('/getCollaborators/', getCollaborators);


module.exports = router;