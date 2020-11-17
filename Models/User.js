'use strict'
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
  name: { type: String },
  email: { type: String },
  password: { type: String },
  salt: { type: String },
})

// No mostrar la contraseña en y salt
UserSchema.methods.toJSON = function(){
  const obj = this.toObject()
  delete obj.password
  delete obj.salt

  return obj
}

module.exports = mongoose.model('User', UserSchema)