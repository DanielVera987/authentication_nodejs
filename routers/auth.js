'use strict'
const express = require('express')
const controllerAuth = require('../Controllers/auth')
const isAuthenticaded = require('../Middlewares/Authenticaded')

const router = express.Router()

router.post('/register', controllerAuth.register)
router.post('/auth', controllerAuth.auth)
router.get('/me', isAuthenticaded, controllerAuth.me)

module.exports = router