// Imports
// Imports
const dotenv = require('../services/admin')
const bcrypt = require('bcrypt');
const models = require('../models');
const userId = require('../services/GetUserId')
const jwt = require('jsonwebtoken')

// Regex

const REGEX_EMAIL = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const REGEX_PASSWORD = /^[a-zA-Z]\w{3,14}$/;

// Création des administrateurs

exports.admin = (req, res, next) => {

    let email = req.body.email;
    let password = req.body.password;
    let username = req.body.username;
    let bio = req.body.bio;
    let avatar = `${req.protocol}://${req.get("host")}/images/administration.jpg`

    if (email !== ADMIN_EMAIL || username !== ADMIN_USER || password !== ADMIN_PASS) {
        return res.status(400).json({ 'erreur': "paramètres manquants " });
    }

    models.User.findOne({
        attributes: ['email'],
        where: { email: email }
    })
        .then(userFound => {
            if (!userFound) {
                bcrypt.hash(password, 10, function (err, bcryptedPassword) {

                    const newUser = models.User.create({
                        email: email,
                        username: username,
                        password: bcryptedPassword,
                        bio: bio,
                        avatar: avatar,
                        isAdmin: +1
                    })
                        .then(newUser => {
                            return res.status(201).json({
                                'userId': newUser.id
                            })
                        })
                        .catch(err => {
                            return res.status(500).json({ 'erreur': " impossible d'ajouter l'utilisateur " });
                        });
                });
            } else {
                return res.status(409).json({ 'erreur': "l'utilisateur existe déjà " });
            }
        })
        .catch(function (err) {
            return res.status(500).json({ 'erreur': "impossible de vérifier l'utilisateur " });
        });
}

// Création des utilisateurs

exports.sign = (req, res, next) => {

    let email = req.body.email;
    let password = req.body.password;
    let username = req.body.username;
    let bio = req.body.bio;
    let avatar = `${req.protocol}://${req.get("host")}/images/user_default.jpg`

    if (req.file) {
        avatar = `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
    }

    if (email == null || username == null || password == null) {
        return res.status(400).json({ 'erreur': "paramètres manquants " });
    }

    if (!REGEX_EMAIL.test(email)) {
        return res.status(400).json({ 'erreur': "email incorrect" });
    }

    if (!REGEX_PASSWORD.test(password)) {
        return res.status(400).json
            ({ 'erreur': "mot de passe incorrect (doit contenir entre 4 et 15 caractères, commencer par une lettre et ne contenir aucun symboles" });
    }

    models.User.findOne({
        attributes: ['email'],
        where: { email: email }
    })
        .then(userFound => {
            if (!userFound) {
                bcrypt.hash(password, 10, function (err, bcryptedPassword) {

                    const newUser = models.User.create({
                        email: email,
                        username: username,
                        password: bcryptedPassword,
                        bio: bio,
                        avatar: avatar,
                        isAdmin: 0
                    })
                        .then(newUser => {
                            return res.status(201).json({
                                'userId': newUser.id
                            })
                        })
                        .catch(err => {
                            return res.status(500).json({ 'erreur': " impossible d'ajouter l'utilisateur " });
                        });
                });
            } else {
                res.status(409).json({ message: "l'utilisateur existe déjà" });
            }
        })
        .catch(function (err) {
            return res.status(500).json({ 'erreur': "impossible de vérifier l'utilisateur " });
        });
}

// Connexion des utilisateurs
exports.login = (req,res,next)=>{
    models.User.findOne({
         where :{
             email : req.body.email,
        }
     })
     .then((user)=>{
         if(!user){
             const message= 'User non trouvé!'
             return res.status(404).json({message})
         }
        
         let verifPass = bcrypt.compareSync(req.body.password,user.password);
         if(!verifPass){
             const message = 'Password non valide'
             return res.status(401).json({message})
         }
         const JWT_SIGN_SECRET = 'relou';
         let token = jwt.sign({userId: user.id}, JWT_SIGN_SECRET, {
             expiresIn : 86400 
         });
         
             return res.status(200).json({
                 id: user.id,
                 username: user.username,
                 token: token,
                 isAdmin: user.isAdmin,
                 isLog: +1,
                 
                 
             })
 
         })
     
     .catch((err)=>{
         return res.status(500).json({message : err.message})
     })
 
 };

// Afficher le profil de l'utilisateur

exports.getUserProfil = (req, res, next) => {

    let headerAuth = req.headers['authorization'];
    let userId = jwt.getUserId(headerAuth);

    if (userId < 0)
        return res.status(400).json({ 'erreur': "token erroné" });

    models.User.findOne({
        attributes: ['id', 'email', 'username', 'bio', 'avatar', "isAdmin", "createdAt", "updatedAt"],
        where: { id: userId }
    }).then(user => {
        if (user) {
            res.status(201).json(user);
        } else {
            res.status(404).json({ 'erreur': "utilisateur introuvable" });
        }
    }).catch(err => {
        res.status(500).json({ 'erreur': "recherche de l'utilisateur impossible" });
    });
}

// Modifier le profil de l'utilisateur

exports.updateUserProfil = (req, res, next) => {

    let headerAuth = req.headers['authorization'];
    let userId = jwt.getUserId(headerAuth);
    let password = req.body.password;
    let bio = req.body.bio;
    let avatar = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    let username = req.body.username;

    models.User.findOne({
        attributes: ['id', 'email', 'username', 'bio', 'avatar', "isAdmin", "createdAt", "updatedAt"],
        where: { id: userId }
    }).then(userFound => {
        if (userFound) {
            userFound.update({
                password: (password ? password : userFound.password),
                username: (username ? username : userFound.username),
                bio: (bio ? bio : userFound.bio),
                avatar: (avatar ? avatar : userFound.avatar)
            }).then(userFound => {
                if (userFound) {
                    return res.status(201).json(userFound);
                } else {
                    return res.status(500).json({ 'erreur': "la mise à jour de l'utilisateur a échouée" })
                }
            }).catch(err => {
                res.status(500).json({ 'erreur': "la mise à jour de l'utilisateur a échouée" });
            });
        } else {
            res.status(404).json({ 'erreur': "utilisateur introuvable" });
        }
    }).catch(err => {
        return res.status(500).json({ 'erreur': "utilisateur introuvable" });
    });
}

// Supprimer le profil de l'utilisateur

exports.deleteUserProfil = (req, res, next) => {

    let headerAuth = req.headers['authorization'];
    let userId = jwt.getUserId(headerAuth);

    models.User.findOne({
        attributes: ['id', 'email', 'username', 'bio', 'avatar', "isAdmin", "createdAt", "updatedAt"],
        where: { id: userId }
    })
        .then((user) => {
            user.destroy();
            res.status(200).json(user.id + " a été supprimé");

        }).catch((err) => {
            res.status(404).json({ 'erreur': "la suppression a échouée" });
        });
}

// Afficher la liste de tous les utilisateurs

exports.getAllUsers = (req, res, next) => {

    models.User.findAll()
        .then(users => {
            res.status(200).json(users);
        }).catch(err => {
            res.status(500).json({ 'erreur': "impossible d'afficher les utilisateurs" });
        });
}

// Afficher le profil d'un seul utilisateur

exports.getOneUser = (req, res, next) => {

    models.User.findByPk(req.params.id)
        .then(users => {
            res.status(200).json(users);
        }).catch(err => {
            res.status(500).json({ 'erreur': "impossible d'afficher l'utilisateur" });
        })
}

// Supprimer le profil d'un utilisateur 

exports.deleteOneUser = (req, res, next) => {

    let headerAuth = req.headers['authorization'];
    let userId = jwt.getUserId(headerAuth);

    let UserId = req.params.id

    models.User.findOne({
        where: { id: req.params.id }

    }).then(userFound => {
        if (userFound) {

            userFound.destroy({
                where: { id: userFound.id }

            }).then(userDestroy => {
                if (userDestroy) {
                    res.status(200).json({ message: "l'utilisateur a bien été supprimé" })

                } else {
                    res.status(401).json({ erreur: "la suppression a échouée" })
                }
            }).catch(err => {
                res.status(401).json({ erreur: "la suppression a échouée" })
            })
        } else {
            res.status(401).json({ erreur: "la suppression a échouée" })
        }
    }).catch(err => {
        res.status(404).json({ erreur: "utilisateur introuvable" })
    })

}