const models = require('../models/');
const jwt = require('../middleware/jwt.utils');

exports.createComment = async (req, res, next) => {
    let headerAuth = req.headers['authorization'];
    let userId     = jwt.getUserId(headerAuth);
    let messageId = req.params.id;  

                models.Message.findOne({
                    where: { id:messageId }

                }).then(messageFound => {
                    if(messageFound) {

                        models.Comment.create({
                            userId: userId,
                            messageId: messageId,
                            username: req.body.username ,                      
                            content: req.body.content
                                                    
                            }).then(response => {
                                res.status(201).send(response)
                            })
                            .catch (err=> {
                                res.status(500).send(err)
                            })
                    }else{
                        res.status(404).json({ erreur: "message introuvable"})
                    }
                }).catch(err => {
                    res.status(404).json({ erreur: "umessage introuvable"})
                })          
},

exports.getAllComments =  (req, res, next) => {

    models.Comment.findAll({
        order: [
            ["createdAt"," DESC" ]
        ]

    }).then(comments => {
        res.status(200).json(comments);

    }).catch(err=> {
        res.status(500).json({erreur: "service indisponible"})
    })
}