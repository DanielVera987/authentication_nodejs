const jwt = require('jsonwebtoken')
const UserModel = require('../Models/User')

const isAuthenticaded = (req, res, next) => {
  const token = req.headers.authorization

  if (!token) return res.sendStatus(401)

  jwt.verify(token, 'mi-clave-secreta', (err, decoded) => {
    const { _id } = decoded

    UserModel.findById(_id).exec()
    .then(user => {
      res.user = user
      next()
    })
  })
}

module.exports = isAuthenticaded