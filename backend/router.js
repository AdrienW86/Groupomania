// Imports

const express = require('express');
const router = express.Router();
const multer = require('./middleware/multer-config')
const messageCtrl = require('./controllers/messageCtrl');
const userCtrl = require('./controllers/usersCtrl');
//const likesCtrl = require('../controllers/likesCtrl');



// Users routes
router.post('/admin/', userCtrl.admin);
router.post('/signup/', userCtrl.signup);
router.post('/login/',userCtrl.login);
router.get('/all/', userCtrl.getAllUsers)
router.get('/profil/', userCtrl.getUserProfil);
router.put('/profil/', userCtrl.updateUserProfil);
router.delete('/profil/', userCtrl.deleteUserProfil);

// Messages routes

router.post('/messages/new/', multer, messageCtrl.createMessage);
router.get('/messages/', messageCtrl.listMessage);
//router.delete('/messages/:id/', messageCtrl.deleteMessage); // a finaliser
//router.put('messages/:id/', messageCtrl.modifyMessage);     // à finaliser

// Likes

//router.post('/messages/:messageId/vote/like',likesCtrl.likePost);       // à voir avec le client
//router.post('/messages/:messageId/vote/dislike',likesCtrl.dislikePost);

   
module.exports = router;