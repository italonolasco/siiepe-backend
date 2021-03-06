const User = require('../models/User')

module.exports = {    
    async certificateCollaborator(req, res) {
        let usersCertificate = []

        const users = await User.find({operator: 1})

        users.forEach(element => {
            if(element.events.length >= 4 && element.events.length < 8 && (element.userevent == 'CIC' || element.userevent == 'CIT' || element.userevent == 'ENPOS')) {   
                usersCertificate.push({tipo: 'C', registro: element.registration, nome: element.name, evento: element.userevent, horas: 20})
            }
            
            else if(element.events.length >= 8 && (element.userevent == 'CIC' || element.userevent == 'CIT' || element.userevent == 'ENPOS')) {
                usersCertificate.push({tipo: 'C', registro: element.registration, nome: element.name, evento: element.userevent, horas: 40})
            } 
        })

        return res.json(usersCertificate)        
    },

    async certificateDebater(req, res) {
        let usersCertificate = []

        const users = await User.find({})

        users.forEach(element => {
            if(element.userfunction == 'DEB' && (element.userevent == 'CIC' || element.userevent == 'CIT' || element.userevent == 'ENPOS')) {
                if(element.events.length != 0) {
                    usersCertificate.push({tipo: 'D', registro: element.registration, nome: element.name, evento: element.userevent})
                }  
            }
        })

        return res.json(usersCertificate)
    },
    
    async certificatePresenter(req, res) {
        let usersCertificate = []
        let cit = 0
        let cic = 0
        let enpos = 0

        const users = await User.find({userfunction: 'AO'})

        users.forEach(element => {
            element.events.forEach(event => {
                if(event.userfunction == 'A'  && event.name == 'CIC') {    
                    usersCertificate.push({tipo: 'A', registro: element.registration, nome: element.name, evento: event.name})
                    cic++
                }

                else if(event.userfunction == 'A'  && event.name == 'CIT') {    
                    usersCertificate.push({tipo: 'A', registro: element.registration, nome: element.name, evento: event.name})
                    cit++
                }

                else if(event.userfunction == 'A'  && event.name == 'ENPOS') {    
                    usersCertificate.push({tipo: 'A', registro: element.registration, nome: element.name, evento: event.name})
                    enpos++
                }
            })
        })

        console.log(cic, cit, enpos)
        return res.json(usersCertificate)
    },

    async certificateListener(req, res) {
        let usersCertificate = []
        let cit = 0
        let cic = 0
        let enpos = 0

        const users = await User.find({userfunction: 'AO'})

        users.forEach(element => {           
            if(element.events.length != 0 && element.userevent == 'CIC') {
                usersCertificate.push({registro: element.registration, nome: element.name, leituras: element.events})
                cic++
            }

            else if(element.events.length != 0 && element.userevent == 'CIT') {
                usersCertificate.push({registro: element.registration, nome: element.name, leituras: element.events})
                cit++
            }

            else if(element.events.length != 0 && element.userevent == 'ENPOS') {
                usersCertificate.push({registro: element.registration, nome: element.name, leituras: element.events})
                enpos++
            }
        })

        console.log(cic, cit, enpos)
        return res.json(usersCertificate)
    },

    async certificateSIIEPE(req, res) {
        let usersCertificate = []

        const users = await User.find({userfunction: 'AO'})

        users.forEach(element => {           
            if(element.events.length != 0  && (element.userevent == 'SIEPE' || element.userevent == 'SIIEPE')) {
                usersCertificate.push({registro: element.registration, nome: element.name, leituras: element.events})
            }
        })

        return res.json(usersCertificate)
    }
}