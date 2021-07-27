// Imports

const express = require('express');
const auth = require('../middleware/auth')
const router = express.Router();
const multer = require('../middleware/multer-config');
const userCtrl = require('../controllers/usersCtrl');

// Users routes

router.post('/admin', userCtrl.admin);
router.post('/sign' ,userCtrl.sign);
router.post('/login', userCtrl.login);
router.get('/users', auth, userCtrl.getAllUsers);
router.get('/users/:id/', auth, userCtrl.getOneUser);
router.get('/profil/', auth, userCtrl.getUserProfil);
router.put('/profil/', auth, multer, userCtrl.updateUserProfil);
router.delete('/profil/', auth, userCtrl.deleteUserProfil);
router.delete('/users/:id/', auth, userCtrl.deleteOneUser);

module.exports = router;