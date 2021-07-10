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
    let picture    = req.body.picture;
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

exports.updateMessage = (req, res, next) => {

    let headerAuth       = req.headers['authorization'];
    
    let title            = req.body.title;
    let content          = req.body.content;
    let picture          = req.body.picture;
    

    models.Message.findByPk(req.params.id)
        
    .then(messageFound =>{
        if(messageFound) {
            messageFound.update({
                title  : (title   ? title   : messageFound.title),
                content: (content ? content : messageFound.content),
                picture: (picture ? picture : messageFound.picture)
            }).then(messageFound => {
                if (messageFound) {
                    return res.status(201).json(messageFound);
                }else{
                    return res.status(500).json({ 'ereur': "la mise à jour du message à échouée"})
                }
            }).catch(err => {
                res.status(500).json(err)
            })
        }else{
            res.status(404).json({ 'erreur': "message introuvable"})
        }
    }).catch(err => {
        return res.status(500).json(err)
    });
}



// Suppression d'un message



// Afficher la liste des messages

exports.listMessage = (req, res, next) => {
    
    models.Message.findAll()       
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
    }).catch (err => {
        res.status(500).json({ 'erreur': "impossible d'afficher le message"})
    })
}
