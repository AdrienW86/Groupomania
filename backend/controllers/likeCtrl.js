const models = require('../models/');
const UserId = require('../Services/GetUserId')

// Routes
exports.like = (req, res, next) => {

    // Création des Likes 

    let idMessage = req.params.id

    let idUser = UserId(req)

    const liked = 1;

    models.Message.findOne({ where: { id: idMessage } })
        .then(messageFound => {
            if (!messageFound) {
                return res.status(404).json({ message: "Post introuvable !" });
            }
            models.User.findOne({ where: { id: idUser } })
                .then(userFound => {
                    if (!userFound) {
                        return res.status(404).json({ message: "User introuvable !" });
                    }
                    models.Like.findOne({ where: { userId: userFound.id, messageId: messageFound.id } })
                        .then(likeFound => {
                            if (!likeFound) {

                                models.Like.create({
                                    userId: userFound.id,
                                    messageId: messageFound.id,
                                    isLike: liked,
                                })
                                    .then(like => {
                                        messageFound.update({ likes: messageFound.likes + 1 })
                                        return res.status(201).json({ messageFound })
                                    })
                                    .catch(error => {
                                        return res.status(400).json({ error })
                                    })
                            }
                            else if (likeFound) {
                                models.Like.destroy({ where: { userId: userFound.id, messageId: messageFound.id } })
                                    .then(() => {
                                        messageFound.update({ likes: messageFound.likes - 1 })
                                        return res.status(201).json({ messageFound })
                                    })
                                    .catch(error => console.log(error))
                            }
                        })
                        .catch(error => console.log(error))
                })
                .catch(error => console.log(error))
        })
        .catch(error => console.log({ erreur: "message introuvable" }))

}




