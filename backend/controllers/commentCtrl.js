const models = require('../models/');
const jwt = require('../middleware/jwt.utils');

exports.createComment = async (req, res, next) => {
    let headerAuth = req.headers['authorization'];
    let userId = jwt.getUserId(headerAuth);
    let messageId = req.params.id;

    models.Message.findOne({
        where: { id: messageId }

    }).then(messageFound => {
        if (messageFound) {

            models.Comment.create({
                userId: userId,
                messageId: messageId,
                username: req.body.username,
                content: req.body.content

            }).then(response => {
                res.status(201).send(response)
            })
                .catch(err => {
                    res.status(500).send(err)
                })
        } else {
            res.status(404).json({ erreur: "message introuvable" })
        }
    }).catch(err => {
        res.status(404).json({ erreur: "umessage introuvable" })
    })
},

    exports.getAllComments = (req, res, next) => {

    let headerAuth = req.headers['authorization'];
    let userId = jwt.getUserId(headerAuth);
    let messageId = req.params.id;

        models.Message.findOne({
            where: { id: messageId}

        }).then(messageFound => {
            if(!messageFound) {
                res.status(404).json({ erreur: " le message n'existe pas"})

            }else {
                models.Comment.findAll({
                    where: { messageId :messageId}

                }).then(commentFound => {
                  return  res.status(201).json({commentFound})

                }).catch(err => {
                    return res.status(404).json({ erreur: "commentaires introuvables"})
                })
            }

        }).catch(err => {
             res.status(404).json({ erreur: "impossible de trouver le message"})
        })
    }