const express = require('express')
const routes = express.Router()
const UserController = require('./controllers/UserController')
const ReadController = require('./controllers/ReadController')

routes.post('/users/login', UserController.login)
routes.post('/users/store', UserController.store)
routes.post('/users/:cpfread/read', ReadController.store)

module.exports = routes