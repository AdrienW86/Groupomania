// Imports

const models = require('../models');
const jwtUtils = require('../middleware/jwt.utils');

exports.likePost = (req, res, next) => {

    // Gettin auth header
    let headerAuth = req.headers['authorization'];
    let userId = jwtUtils.getUserId(headerAuth);

    // Params
    let messageId = parseInt(req.params.messageId);         // On récupère l'identifiant du message

    if (messageId <= 0 ) {
        return res.status(400).json({ 'erreur': "paramètres invalides" });  // on détermine l'id du message
    }

models.Message.findOne({
    where: { id: messageId }     
})

.then(messageFound => {       // on regarde si le message existe dans la base de données

    if(messageFound) {              // si le message est trouvé
        models.User.findOne ({
            where: { id: userId }
        })

        if(userFound) {       // si l'utilisateur à été trouvé

            models.Like.findOne({
                where: {
                    userId: userId,                 // clé utilisateur
                    messageId: messageId            // clé du message
                }
            })

            .then(isUserAlreadyLiked => {                   
              
                if(!isUserAlreadyLiked) {                   // si l'utilisateur n'as pas liké

                 messageFound.addUser(userFound)

                    .then(alreadyLikeFound => {

                        messageFound.update({
                            likes: messageFound.likes +1,       // mise a jour du compteur
                        
                        }).then(() => {

                            if (messageFound) {
                                return res.status(201).json(messageFound);
                           
                            }else{
                                return res.status(500).json({ 'erreur': "impossible de mettre a jour le message" });
                            }

                        }).catch(err => {
                            res.status(500).json({ 'erreur': "impossible de mettre à jour le compteur de like"})
                        })

                    }).catch(err => {
                    res.status(500).json({ 'erreur': "impossible d'enregistrer la réaction de l'utilisateur"})
                    })

                }else{
                    res.status(409).json({ 'erreur': "message déjà liké" });
                }

            }).catch(err => {
                return res.status(500).json({ 'erreur': "impossible de véfier si l'utilisateur a liké" });
            })

        }else{
             res.status(404).json({ 'erreur': "utilsateur introuvable" });
        }
    
    }else{
        res.status(404).json({ 'erreur': " message introuvable" });
    }

}).catch(err => {
    return res.status(500).json({ 'erreur':" impossible de vérifier le message"})
})




}



exports.dislikesPost = (req, res, next) => {

}