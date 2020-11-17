'use strict'
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')

const routerAuth = require('./routers/auth')

const app = express()
//app.use(cors)
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

mongoose.connect('mongodb://127.0.0.1/authentication', { useNewUrlParser: true , seUnifiedTopology: true })

app.use('/api', routerAuth)

module.exports = app