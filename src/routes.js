const express = require('express')
const routes = express.Router()

const UserController = require('./controllers/UserController')
const ReadController = require('./controllers/ReadController') 
const CertificateController = require('./controllers/CertificateController')
const CCEController = require('./controllers/CCEController')
const CEGController = require('./controllers/CEGController')
const CECController = require('./controllers/CECController')
const TccData = require('./controllers/TccData')

routes.post('/users/store', UserController.store)
routes.post('/users/read', ReadController.store)

routes.get('/users/certificate-collaborator', CertificateController.certificateCollaborator)
routes.get('/users/certificate-debater', CertificateController.certificateDebater)
routes.get('/users/certificate-listener', CertificateController.certificateListener)
routes.get('/users/certificate-presenter', CertificateController.certificatePresenter)

routes.get('/users/collaborator-cce', CCEController.certificateCollaborator)
routes.get('/users/debater-cce', CCEController.certificateDebater)
routes.get('/users/presentation-cce', CCEController.certificatePresenter)
routes.get('/users/listener-cce', CCEController.certificateListener)
routes.get('/users/listener-siiepe', CCEController.certificateSIIEPE)

routes.get('/users/collaborator-ceg', CEGController.certificateCollaborator)
routes.get('/users/debater-ceg', CEGController.certificateDebater)
routes.get('/users/presentation-ceg', CEGController.certificatePresenter)
routes.get('/users/listener-ceg', CEGController.certificateListener)

routes.get('/users/collaborator-cec', CECController.certificateCollaborator)
routes.get('/users/debater-cec', CECController.certificateDebater)
routes.get('/users/presentation-cec', CECController.certificatePresenter)
routes.get('/users/listener-cec', CECController.certificateListener)

routes.get('/users/presentation', TccData.getPresentation)
routes.get('/users/listener', TccData.getListener)
routes.get('/users/collaborator', TccData.getCollaborator)
routes.get('/users/debater', TccData.getDebater)

module.exports = routes