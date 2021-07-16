// Imports

const express = require('express');
const router = express.Router();
const multer = require('./middleware/multer-config');
const messageCtrl = require('./controllers/messageCtrl');
const userCtrl = require('./controllers/usersCtrl');
const likeCtrl = require('./controllers/likeCtrl');

// Users routes

router.post('/admin/', userCtrl.admin);
router.post('/sign/', userCtrl.sign);
router.post('/login/',userCtrl.login);
router.get('/users/', userCtrl.getAllUsers);
router.get('/users/:id',userCtrl.getOneUser);
router.get('/profil/', userCtrl.getUserProfil);
router.put('/profil/', userCtrl.updateUserProfil);
router.delete('/profil/', userCtrl.deleteUserProfil);

// Messages routes

router.post('/messages/new/', multer, messageCtrl.createMessage);
router.get('/messages/', messageCtrl.listMessage);
router.get('/messages/:id', messageCtrl.getOneMessage);
router.delete('/messages/:id/', messageCtrl.deleteMessage); 

// Likes

router.post('/messages/:id/like', likeCtrl.like);      
router.post('/messages/:id/dislike',likeCtrl.dislike);

   
module.exports = router;