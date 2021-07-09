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
    let userId     = jwt.getUserId(headerAuth);

    let title      = req.body.title;
    let content    = req.body.content;
    let picture    = "";
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
        if(userFound) {
            models.Message.create({
                title  : title,
                content: content,
                picture: picture,
                likes  : 0,
                UserId : userFound.id
            })
            .then(newMessage => {
                if (newMessage) {
                    return res.status(201).json(newMessage);
                }else{
                    return res.status(500).json({ 'erreur': "impossible de publier le message" });
                }
            });
        }else{
            res.status(404).json({ 'erreur': "utilisateur introuvable" });
        }
    })
    .catch(err => {
        return res.status(500).json({ 'erreur': "impossible de trouver l'utilisateur" });
    });
}

// Modification d'un message




// Suppression d'un message



// Afficher la liste des messages

exports.listMessage = (req, res, next) => {
    let fields = req.query.fields;
    let limit = parseInt(req.query.limit);
    let offset = parseInt(req.query.offset);
    let order = req.query.order;

    models.Message.findAll({
        order: [(order != null) ? order.split(':') : ['createdAt', 'DESC']],
        attributes: (fields != '*' && fields != null) ? fields.split(',') : null,
        limit: (!isNaN(limit)) ? limit : 20,
        offset: (!isNaN(offset)) ? offset : 20,
        include: [{
            model: models.User,
            attributes: ['email']
        }]
        }).then(messages => {
            if (messages) {
                res.status(200).json(messages);
            }else{
                res.status(404).json({ 'erreur': "aucun messages trouvés" });
            }    
        }).catch(err => {
            console.log(err);
            res.status(500).json({ 'erreur': "champs invalides" });
    })
}

// Afficher un seul message