
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      const message = "No Token provided"
      return res.status(403).json({ message });
    }
    const decodedToken = jwt.verify(token, process.env.SECRET.TOKEN);
    const userId = decodedToken.userId;
    if (req.body.userId && req.body.userId !== userId) {
      throw 'Invalid user ID';
    } else {
      req.user = decodedToken;

      next();
    }
  } catch {
    res.status(401).json({
      erreur: "requête non authentifiée "
    });
  }

};
