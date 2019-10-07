const express = require('express')
const routes = express.Router()
const UserController = require('./controllers/UserController')
const ReadController = require('./controllers/ReadController')

routes.get('/users/certificate-presenter', UserController.certificatePresenter)
routes.get('/users/certificate-listener', UserController.certificateListener)
routes.post('/users/store', UserController.store)
routes.post('/users/:regread/read', ReadController.store)

module.exports = routes