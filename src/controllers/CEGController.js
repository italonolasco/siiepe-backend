const User = require('../models/User')

module.exports = {    
    async certificateCollaborator(req, res) {
        let usersCertificate = []

        const users = await User.find({operator: 1})

        users.forEach(element => {
            if(element.events.length >= 4 && element.events.length < 8 && element.userevent == 'CEG') {   
                usersCertificate.push({tipo: 'C', registro: element.registration, nome: element.name, evento: element.userevent, horas: 20})
            }
            
            else if(element.events.length >= 8 && element.userevent == 'CEG') {
                usersCertificate.push({tipo: 'C', registro: element.registration, nome: element.name, evento: element.userevent, horas: 40})
            } 
        })

        return res.json(usersCertificate)        
    },

    async certificateDebater(req, res) {
        let usersCertificate = []

        const users = await User.find({})

        users.forEach(element => {
            if(element.userfunction == 'DEB' && element.userevent == 'CEG') {
                if(element.events.length != 0) {
                    usersCertificate.push({tipo: 'D', registro: element.registration, nome: element.name, evento: element.userevent})
                }  
            }
        })

        return res.json(usersCertificate)
    },
    
    async certificatePresenter(req, res) {
        let usersCertificate = []
        let ceg = 0

        const users = await User.find({userfunction: 'AO'})

        users.forEach(element => {
            element.events.forEach(event => {
                if(event.userfunction == 'A'  && event.name == 'CEG') {    
                    usersCertificate.push({tipo: 'A', registro: element.registration, nome: element.name, evento: event.name})
                    ceg++
                }
            })
        })

        console.log(ceg)
        return res.json(usersCertificate)
    },

    async certificateListener(req, res) {
        let usersCertificate = []
        let ceg = 0

        const users = await User.find({userfunction: 'AO'})

        users.forEach(element => {           
            if(element.events.length != 0  && element.userevent == 'CEG') {
                usersCertificate.push({registro: element.registration, nome: element.name, leituras: element.events})
                ceg++
            }
        })

        console.log(ceg)
        return res.json(usersCertificate)
    }
}