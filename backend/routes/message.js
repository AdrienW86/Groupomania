// Imports

const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth')
const multer = require('../middleware/multer-config');

const messageCtrl = require('../controllers/messageCtrl');
const likeCtrl = require('../controllers/likeCtrl');
const commentCtrl = require('../controllers/commentCtrl');

// Messages routes

router.post('/messages/new/',auth, multer, messageCtrl.createMessage);
router.get('/messages/', messageCtrl.listMessage);
router.get('/messages/:id/',auth, messageCtrl.getOneMessage);
router.delete('/messages/:id/',auth, messageCtrl.deleteMessage);

// Likes routes

router.post('/messages/like/:id/',auth, likeCtrl.like);

// Comment routes

router.post('/messages/comment/:id/', auth, commentCtrl.createComment)
router.get('/messages/comments/:id/',auth, commentCtrl.getAllComments)
router.delete('/messages/comment/:id/',auth ,commentCtrl.deleteOneComment)

module.exports = router;