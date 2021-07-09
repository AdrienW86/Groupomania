// Imports

const bcrypt = require('bcrypt');
const jwt    = require('jsonwebtoken');
const models = require('../models/index');

// Regex

const REGEX_EMAIL = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const REGEX_PASSWORD = /^[a-zA-Z]\w{3,14}$/;

// Routes

// Création des administrateurs

exports.admin = (req, res, next) => {

    // Params

    let email    = req.body.email;
    let password = req.body.password;
    let username = req.body.username;
    let bio      = req.body.bio;
    let avatar   = req.body.avatar

    if (email !== 'adrien@outlook.fr' || username !== 'Adrien' || password !== 'alibabas') {
        return res.status(400).json({ 'erreur': "paramètres manquants "});
    }

    models.User.findOne({
        attributes: ['email'],
        where: { email: email }
    })
    .then(userFound => {
        if (!userFound) {
            bcrypt.hash(password , 10, function(err, bcryptedPassword) { 
            
                const newUser = models.User.create({
                    email   : email,
                    username: username,
                    password: bcryptedPassword,
                    bio     : bio,
                    avatar  : avatar,
                    isAdmin : +1 
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
        }else{
            return res.status(409).json({ 'erreur': "l'utilisateur existe déjà "});
        }
    })
    .catch(function(err) {
        return res.status(500).json({ 'erreur': "impossible de vérifier l'utilisateur "});
    });
}

// Création des utilisateurs

exports.signup = (req, res, next) => {

    let email     = req.body.email;
    let password  = req.body.password;
    let username  = req.body.username;
    let bio       = req.body.bio;
    let avatar    = req.body.avatar
    
    if (email == null || username == null || password == null) {
        return res.status(400).json({ 'erreur': "paramètres manquants "});
    }

    if (!REGEX_EMAIL.test(email)) {
        return res.status(400).json({ 'erreur': "email incorrect" });
    }

    if (!REGEX_PASSWORD.test(password)) {
        return res.status(400).json
        ({ 'erreur': "mot de passe incorrect (doit contenir entre 4 et 15 caractères, commencer par une lettre et ne contenir aucun symboles"});
    }

    models.User.findOne({
        attributes: ['email'],
        where: { email: email }
    })
    .then(userFound => {
        if (!userFound) {
                  bcrypt.hash(password, 10, function(err, bcryptedPassword) {

                const newUser = models.User.create({
                    email   : email,
                    username: username,
                    password: bcryptedPassword,
                    bio     : bio,
                    avatar  : avatar,
                    isAdmin : 0
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
         }else{
            return res.status(409).json({ 'erreur': "l'utilisateur existe déjà "});
        }
    })
    .catch(function(err) {
        return res.status(500).json({ 'erreur': "impossible de vérifier l'utilisateur "});
    });
}

// Connexion des utilisateurs

exports.login = (req, res, next) => { 

    let email = req.body.email;
    let password = req.body.password;

    if (email == null || password == null) {
        return res.status(400).json({ 'erreur': "paramètres manquants" });
    }

    models.User.findOne({
        where: { email: email }
    })
    .then(userFound=> {
        if (userFound) {
            bcrypt.compare(password, userFound.password, function(errBycrypt, resBycrypt) {
                if(resBycrypt) {
                    return res.status(200).json({
                        'userId': userFound.id,
                        'token': jwtUtils.generateTokenForUser(userFound),
                        'isAdmin': userFound.isAdmin,
                        'username': userFound.username,
                        'isLog': +1
                    });

                }else{
                    return res.status(403).json({ 'erreur': "mot de passe invalide" });
                }
            });

        }else{
            return res.status(404).json({ 'erreur': "utilisateur introuvable dans la base de données" });
        }

    })
    .catch (err => {
        return res.status(500).json({ 'erreur': "impossible de connecter l'utilisateur" });
    });
}