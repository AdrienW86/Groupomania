const models = require('../models/');
const jwt = require('../middleware/jwt.utils');

exports.like = (req, res, next) => {

  let messageId = req.params.id;
  let headerAuth = req.headers['authorization'];
  let userId     = jwt.getUserId(headerAuth);

    models.Message.findOne({
        where: { id:messageId }

    }).then(messageFound => {
        if(messageFound) {

          models.User.findOne({
            where: {id :userId}

          }).then(userFound=> {
              if(userFound) {

               models.Like.create({
                messageId: messageId,
                userId : userId,
                isLike: 1,
                isDislike: 0

                  }).then(createdLike => {
                        if(createdLike){

                          models.Like.findOne({
                            where: {
                              userId: userId,
                              messageId: messageId
                            }
                          
 
                           }).then(likeFound => {
                             if(likeFound) {

                              messageFound.update({
                                likes: messageFound.likes + 1 

                              }).then(messageUpdated => {
                                  if(messageUpdated) {

                              return res.status(201).json(newLike)

                                  }else{

                               res.status(401).json({ erreur: "le message n'as pas pu être mis à jour"})
                             }

                           }).catch(err=> {
                             res.status(401).json({ erreur: "impossible de mettre le message à jour"})
                           })
 
                        }else {

                        }
                }).catch(err=> {
                    res.status(401).json({ erreur: " mettre le message à jour"})
                })                                         
            
              }else {
                res.status(404).json({ erreur: "impossible de trouver l'utilisateur"})
              }
          }).catch(err=> {
            res.status(404).json({ erreur: "utilisateur introuvable"})
          })

        }else{
          res.status(404).json({ erreur: "impossible de trouver le message"})
        }
    }).catch(err=> {
      res.status(404).json({ erreur: "message introuvable"})
    })
}else{

}
}).catch( err=> {
  res.status(404).json({ erreur: "message introuvable"})
    
})
}
exports.dislike = (req, res, next) => {

  let messageId = req.params.id;
  let headerAuth = req.headers['authorization'];
  let userId     = jwt.getUserId(headerAuth);

    models.Message.findOne({
        where: { id:messageId }

    }).then(messageFound => {
        if(messageFound) {

          models.User.findOne({
            where: {id : userId}

          }).then(userFound => {
              if( userFound) {

                models.Like.findOne({
                  where: {
                    userId: userId,
                    messageId: messageId
                  }

                }).then(likeFound =>{
                    if(likeFound) {

                      likeFound.update({
                        isLike: -1

                      }).then(likeUpdated =>{
                        if(likeUpdated) {

                          messageFound.update({
                           dislikes: messageFound.dislikes + 1 

                          }).then(messageUpdated => {
                            if(messageUpdated) {

                              return res.status(201).json(newLike)

                            }else{
                              res.status(401).json({ erreur: "le message n'as pas pu être mis à jour"})
                            }
                          }).catch(err=> {
                            res.status(401).json({ erreur: "impossible de mettre le message à jour"})
                          })

                        }else{
                          res.status(401).json({ erreur: "le like n'as pas pu être mis à jour"})
                        }

                      }).catch(err => {
                        res.status(404).json({ erreur: "like introuvable"})
                      })

                  }else{
                    res.status(404).json({ erreur: "impossible de trouver le like"})
                  }

                }).catch(err => {
                  res.status(404).json({ erreur: "like introuvable"})
                })

              }else {
                res.status(404).json({ erreur: "impossible de trouver l'utilisateur"})
              }
          }).catch(err=> {
            res.status(404).json({ erreur: "utilisateur introuvable"})
          })

        }else{
          res.status(404).json({ erreur: "impossible de trouver le message"})
        }
    }).catch(err=> {
      res.status(404).json({ erreur: "message introuvable"})
    })
}
