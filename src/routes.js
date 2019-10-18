const express = require('express')
const routes = express.Router()
const UserController = require('./controllers/UserController')
const ReadController = require('./controllers/ReadController')

routes.get('/users/certificate-collaborator', UserController.certificateCollaborator)
routes.get('/users/certificate-debater', UserController.certificateDebater)
routes.get('/users/certificate-listener', UserController.certificateListener)
routes.get('/users/certificate-presenter', UserController.certificatePresenter)
routes.get('/users/certificate-tec', UserController.certificateTec)
routes.post('/users/store', UserController.store)
routes.post('/users/read', ReadController.store)

module.exports = routes