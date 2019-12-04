const User = require('../models/User')

module.exports = {    
    async certificateCollaborator(req, res) {
        let usersCertificate = []

        const users = await User.find({operator: 1})

        users.forEach(element => {
            if(element.events.length >= 4) {   
                usersCertificate.push({tipo: 'C', registro: element.registration, nome: element.name, evento: element.userevent, horas: 20})
            }
        })

        return res.json(usersCertificate.length)        
    },

    async certificateDebater(req, res) {
        let usersCertificate = []

        const users = await User.find({})

        users.forEach(element => {
            if(element.userfunction == 'DEB') {
                if(element.events.length != 0) {
                    usersCertificate.push({tipo: 'D', registro: element.registration, nome: element.name, evento: element.userevent})
                }  
            }
        })

        return res.json(usersCertificate)
    },

    async certificateListener(req, res) {
        let usersCertificate = []

        const users = await User.find({userfunction: 'AO'})

        users.forEach(element => {           
            if(element.events.length >= 3) {
                usersCertificate.push({tipo: 'O', registro: element.registration, nome: element.name})
            }
        })

        return res.json(usersCertificate.length)
    },
    
    async certificatePresenter(req, res) {
        let usersCertificate = []

        const users = await User.find({userfunction: 'AO'})

        users.forEach(element => {
            element.events.forEach(event => {
                if(event.userfunction == 'A') {    
                    usersCertificate.push({tipo: 'A', registro: element.registration, nome: element.name, evento: event.name})
                }
            })
        })

        return res.json(usersCertificate)
    },
}