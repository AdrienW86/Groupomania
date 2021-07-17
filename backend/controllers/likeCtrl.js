// Import

const models = require('../models/');
const jwt = require('../middleware/jwt.utils');

exports.like = (req, res, next) => {

    let  messageId = req.params.id;

    models.Message.findOne({
        where: { id:messageId }
    })
        .then(messageFound => {
            if (messageFound) {
                models.Message.findOne({
                    attributes: ['id', 'likes', 'dislikes','username'],
                    where: { id: messageId}

                }).then(messageFound => {

                    if (messageFound) {

                        messageFound.increment('likes', {
                            where: { id: messageId }

                        }).then(messageFound => {
                            if (messageFound) {
                                return res.status(201).json(messageFound);

                            } else {
                                return res.status(400).json(messageFound);
                            }
                        })
                    } else {
                        res.status(404).json({ erreur: " message introuvable" })
                    }
                }).catch(err => {
                    res.status(404).json({ erreur: " utilisateur introuvableuuuu" })
                })
            } else {
                res.status(404).json({ erreur: " utilisateur introuvableoo" })
            }
        }).catch(err => {
            res.status(404).json({ erreur: " utilisateur introuvablemmm" })
        })
}

exports.dislike = (req, res, next) => {

    let  messageId = req.params.id;

    models.Message.findOne({
        where: { id:messageId }
    })
        .then(messageFound => {
            if (messageFound) {
                models.Message.findOne({
                    attributes: ['id', 'likes', 'dislikes','username'],
                    where: { id: messageId}

                }).then(messageFound => {

                    if (messageFound) {

                        messageFound.increment('dislikes', {
                            where: { id: messageId }

                        }).then(messageFound => {
                            if (messageFound) {
                                return res.status(201).json(messageFound);

                            } else {
                                return res.status(400).json(messageFound);
                            }
                        })
                    } else {
                        res.status(404).json({ erreur: " message introuvable" })
                    }
                }).catch(err => {
                    res.status(404).json({ erreur: " utilisateur introuvableuuuu" })
                })
            } else {
                res.status(404).json({ erreur: " utilisateur introuvableoo" })
            }
        }).catch(err => {
            res.status(404).json({ erreur: " utilisateur introuvablemmm" })
        })
}