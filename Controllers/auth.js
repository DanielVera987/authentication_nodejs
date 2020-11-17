'use strict'
const UserModel = require('../Models/User')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')

const signToken = (_id) => {
  return jwt.sign({ _id }, 'mi-clave-secreta', { 
    expiresIn: 60 * 60 * 24 * 365,
  })
}

const controllerAuth = {

  register: (req, res) => {
    const {name, email, password} = req.body

    crypto.randomBytes(16, (err, salt) => {
      const newSalt = salt.toString('base64')

      crypto.pbkdf2(password, newSalt, 10000, 64, 'sha1', (err, key) => {
        const encryptedPassword = key.toString('base64')
        
        UserModel.findOne({email}).exec()
        .then(user => {
          if(user) return res.status(201).send({ status: 'success 🚀', message: 'Este usuario ya existe'})
          
          UserModel.create({  
            name,
            email,
            password: encryptedPassword,
            salt: newSalt
          })
          .then(user => res.status(200).send( { status: 'success 🚀', user } ))
          .catch(err => res.status(500).send( { status: 'Error' } ))
        })

      })
    })
  },

  auth: (req, res) => {
    const {email, password} = req.body

    UserModel.findOne({email}).exec()
    .then(user => {
      if (!user) return res.status(404).send({status: 'found', message: 'El usuario no esta registrado'})

      crypto.pbkdf2(password, user.salt, 10000, 64, 'sha1', (err, key) => {
        const encryptedPassword = key.toString('base64')
        if (user.password === encryptedPassword) {
          const token = signToken(user._id)
          return res.status(200).send({token})
        } else {
          return res.status(404).send({message: 'Email y constraseña son incorrectas'})
        }
      })
    })
  },

  me: (req, res) => {
    return res.status(200).send({
      user: res.user
    })
  }

}

module.exports = controllerAuth