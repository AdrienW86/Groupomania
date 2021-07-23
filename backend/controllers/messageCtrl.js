// Imports

const models = require('../models/');
const jwt = require('../middleware/jwt.utils');
const TITLE_LIMIT = 2;
const CONTENT_LIMIT = 4;

// Routes

// Création d'un message

exports.createMessage = (req, res, next) => {

    //Gettin auth header

    let headerAuth = req.headers['authorization'];
    let userId = jwt.getUserId(headerAuth);
    let title = req.body.title;
    let content = req.body.content;
    let username = req.body.username;
    let isAdmin = req.body.isAdmin;
    let picture = req.body.picture
    if (req.file) {
        picture = `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
    }
    if (title == null || content == null) {
        return res.status(400).json({ 'erreur': "paramètres manquants" });
    }
    if (title.length <= TITLE_LIMIT || content.length <= CONTENT_LIMIT) {
        return res.status(400).json({ 'erreur': "paramètres invalides" });
    }
    models.User.findOne({
        where: { id: userId }
    })
        .then(userFound => {
            if (userFound) {
                models.Message.create({
                    title: title,
                    content: content,
                    picture: picture,
                    username: username,
                    likes: 0,
                    dislikes: 0,
                    UserId: userFound.id,
                    isAdmin: isAdmin,
                })
                    .then(newMessage => {
                        if (newMessage) {
                            return res.status(201).json(newMessage);
                        } else {
                            return res.status(500).json({ 'erreur': "impossible de publier le message" });
                        }
                    });
            } else {
                res.status(404).json({ 'erreur': "utilisateur introuvable" });
            }
        })
        .catch(err => {
            return res.status(500).json({ 'erreur': "impossible de trouver l'utilisateur" });
        });
}

// Suppression d'un message

exports.deleteMessage = (req, res, next) => {
    let messageId = req.params.id;

    models.Message.destroy(
        { where: { id: messageId } })
        .then(messageFound => {
            if (messageFound) {
                res.status(200).json({ 'message': "Le message a bien été supprimé" })
            } else {
                res.status(404).json({ 'erreur': " Le message n'a pas été supprimé" })
            }
        }).catch(err => {
            res.status(500).json({ err })
        })
}

// Afficher la liste des messages

exports.listMessage = (req, res, next) => {

    models.Message.findAll({
        order: [
            ["createdAt", "DESC"]
        ]
    })
        .then(messages => {
            res.status(200).json(messages);

        }).catch(err => {
            console.log(err);
            res.status(500).json({ 'erreur': "champs invalides" });
        })
}

// Afficher un seul message

exports.getOneMessage = (req, res, next) => {

    models.Message.findByPk(req.params.id)
        .then(messages => {
            res.status(200).json(messages);
        }).catch(err => {
            res.status(500).json({ 'erreur': "impossible d'afficher le message" })
        })
}


