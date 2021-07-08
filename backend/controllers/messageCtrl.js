// Imports

const models = require('../models');
const jwtUtils = require('../middleware/jwt.utils');


const TITLE_LIMIT = 2;
const CONTENT_LIMIT = 4;

// Routes

exports.createMessage = (req, res, next) => {

    //Gettin auth header

    let headerAuth = req.headers['authorization'];
    let userId = jwtUtils.getUserId(headerAuth);

    // Params

    let title = req.body.title;
    let content = req.body.content;
    let username = req.body.username;
    let attachment = req.body.attachment;
    
    
    if (req.file) {
        attachment = `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
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

            if (userFound.UserId == 1) {
                userFound.isAdmin == true
                }else {
                    userFound.isAdmin == false
                }
            models.Message.create({
                title: title,
                content: content,
                attachment: attachment,
                likes: 0,
                dislikes: 0,
                isAdmin: userFound.isAdmin,
                username: username,
                UserId: userFound.id
            })
            .then(newMessage => {
                if(newMessage)                  
                    return res.status(201).json(newMessage)
                    
                })
                .catch(err => {
                    return res.status(500).json({ 'erreur': "impossible de publier le message" });
                })
            ;
        }else{
            res.status(404).json({ 'erreur': "utilisateur introuvable" });
        }
    })
    .catch(err => {
        return res.status(500).json({ 'erreur': "impossible de trouver l'utilisateur" });
    });
}

/*exports.listMessage = (req, res, next) => {
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
*/
exports.listMessage = (req, res, next) => {

    models.Message.findAll()   
    .then(messages => {
        res.status(200).json(messages);

    }).catch (err => {
        res.status(500).json({ 'erreur': "impossible d'afficher les utilisateurs"});
    });   
}

exports.getOneMessage = (req, res, next) => {
    const paramId = req.params.id
    models.Message.findOne({
        where : {
            id: paramId
        },
        include: [{
            model: models.User,
            attributes: ['email']
        }],
      })
      .then(message => res.status(200).json(message))
      .catch(error => res.status(404).json({ error }));
}






exports.deleteMessage = (res, req, next) => {

    let messageId = parseInt(req.params.messageId);


    models.Message.findOne({
       where: { id: messageId }
    })

    .then(Message=> {
        if(Message == messageId) {

            Message.destroy()

            res.status(200).json('message supprimé');

        }else{

            res.status(401).json({'erreur': "impossible d'effacer le message" });
        }

    




    
    }).catch(err =>{
        res.status(500).json({ 'erreur': "message introuvable"});
    });     
}




exports.modifyMessage = (res, req, next) => {
    models.Message
}

