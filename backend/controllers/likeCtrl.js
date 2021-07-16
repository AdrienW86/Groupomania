// Import

const models = require('../models/');
const jwt = require('../middleware/jwt.utils');


exports.like = (req, res, next) => {
    
    let headerAuth = req.headers['authorization'];
    let userId     = jwt.getUserId(headerAuth);
    

    models.User.findOne({
        where: { id: userId}
    })
    .then(userFound => {
        if(userFound) {

            models.Message.findOne({
               attributes:['id','likes'],
               where: {id: userId}

            }).then(messageFound => {  
                        
                if(messageFound) {

                    messageFound.increment('likes', { where: { id: userId}
                        
                    }).then(messageFound => {
                        if(messageFound) {
                            return res.status(201).json(messageFound);

                        }else{
                            return res.status(400).json(messageFound);
                        }
                    })                       
                }else{
                    res.status(404).json({ erreur: " umessage introuvable"})
                }
            }).catch(err => {
                res.status(404).json({ erreur: " utilisateur introuvableuuuu"})
            })
      }else {
        res.status(404).json({ erreur: " utilisateur introuvableoo"}) 
      }
    }).catch(err => {
        res.status(404).json({ erreur: " utilisateur introuvablemmm"})
    })
},





exports.dislike =(req, res, next) => {

    let headerAuth = req.headers['authorization'];
    let userId     = jwt.getUserId(headerAuth);

    models.User.findOne({
        where: { id: userId}
    })



}