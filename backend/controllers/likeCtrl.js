const models = require('../models/');
const jwt = require('../middleware/jwt.utils');
var asyncLib = require('async');

// Constants
const DISLIKED = 0;
const LIKED = 1;

// Routes
exports.like = async (req, res, next) => {

    let headerAuth = req.headers['authorization'];
    let userId = jwt.getUserId(headerAuth);
    let messageId = req.params.id;

    models.Message.findOne({
        where: { id: messageId }

    }).then(messageFound => {
        if (messageFound) {

            messageFound.increment({
                likes: 1

            }).then(messageFound => {
                if (messageFound) {

                    models.Like.create({
                        userId: userId,
                        messageId: messageId,
                        isLike: 1,
                        isDislike: 0

                    }).then(likeCreated => {
                        if (likeCreated) {
                            return res.status(201).json(likeCreated)
                        } else {
                            res.status(401).json(err)
                        }
                    }).catch(err => {
                        res.status(401).json(err)
                    })
                } else {
                    res.status(401).json(err)
                }
            }).catch(err => {
                res.status(401).json(err)
            })

        } else {
            res.status(404).json({ erreur: "message introuvable" })
        }
    }).catch(err => {
        res.status(404).json({ erreur: "umessage introuvable" })
    })
},
    exports.dislike = async (req, res, next) => {

        let headerAuth = req.headers['authorization'];
        let userId = jwt.getUserId(headerAuth);
        let messageId = req.params.id;

        models.Message.findOne({
            where: { id: messageId }

        }).then(messageFound => {
            if (messageFound) {

                messageFound.increment({
                    dislikes: 1

                }).then(messageFound => {
                    if (messageFound) {

                        models.Like.create({
                            userId: userId,
                            messageId: messageId,
                            isLike: 0,
                            isDislike: 1

                        }).then(likeCreated => {
                            if (likeCreated) {
                                return res.status(201).json(likeCreated)
                            } else {
                                res.status(401).json(err)
                            }
                        }).catch(err => {
                            res.status(401).json(err)
                        })


                    } else {
                        res.status(401).json(err)
                    }
                }).catch(err => {
                    res.status(401).json(err)
                })

            } else {
                res.status(404).json({ erreur: "message introuvable" })
            }
        }).catch(err => {
            res.status(404).json({ erreur: "umessage introuvable" })
        })
    }