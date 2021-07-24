// Imports

const express = require('express');
const router = express.Router();
const multer = require('./middleware/multer-config');
const messageCtrl = require('./controllers/messageCtrl');
const userCtrl = require('./controllers/usersCtrl');
const likeCtrl = require('./controllers/likeCtrl');
const commentCtrl = require('./controllers/commentCtrl');

// Users routes

router.post('/admin/', userCtrl.admin);
router.post('/sign/', userCtrl.sign);
router.post('/login/', userCtrl.login);
router.get('/users/', userCtrl.getAllUsers);
router.get('/users/:id/', userCtrl.getOneUser);
router.get('/profil/', userCtrl.getUserProfil);
router.put('/profil/', multer, userCtrl.updateUserProfil);
router.delete('/profil/', userCtrl.deleteUserProfil);
router.delete('/users/:id/', userCtrl.deleteOneUser);

// Messages routes

router.post('/messages/new/', multer, messageCtrl.createMessage);
router.get('/messages/', messageCtrl.listMessage);
router.get('/messages/:id/', messageCtrl.getOneMessage);
router.delete('/messages/:id/', messageCtrl.deleteMessage);

// Likes routes

router.post('/messages/like/:id/', likeCtrl.like);
//router.post('/messages/dislike/:id', likeCtrl.dislike);

// Comment routes

router.post('/messages/comment/:id/', commentCtrl.createComment)
router.get('/messages/comments/:id/', commentCtrl.getAllComments)
router.delete('/messages/comment/:id/',commentCtrl.deleteOneComment)

module.exports = router;