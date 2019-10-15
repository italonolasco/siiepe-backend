const User = require('../models/User')

module.exports = {
    async certificateCollaborator(req, res) {
        let usersCertificate = []

        const users = await User.find({})

        users.forEach(element => {
            if(element.operator == '1') {
                if(element.events.length != 0) {
                    if(element.counter >= 6 && element.counter < 12) {
                        
                        usersCertificate.push({tipo: 'C', registro: element.registration, nome: element.name, evento: element.userevent, horas: 20})
                    }
                    
                    else if(element.counter >= 12) {
                        usersCertificate.push({tipo: 'C', registro: element.registration, nome: element.name, evento: element.userevent, horas: 40}) 
                    }
                }
            }
        })

        return res.json(usersCertificate)        
    },
    
    async certificatePresenter(req, res) {
        let usersCertificate = []

        const users = await User.find({})

        users.forEach(element => {
            if(element.events.length != 0) {
                element.events.forEach(event => {
                    if(event.userfunction == 'A' && element.counter >= 1) {
                        usersCertificate.push({tipo: 'A', registro: element.registration, nome: element.name, evento: event.name})
                    }   
                })
            }
        })

        return res.json(usersCertificate)
    },

    async certificateListener(req, res) {
        let usersCertificate = []

        const users = await User.find({})

        users.forEach(element => {           
            if(element.counter >= 8) {
                usersCertificate.push({tipo: 'O', registro: element.registration, nome: element.name, horas: 20})
            }
        })

        return res.json(usersCertificate)
    },
    
    async store(req, res) {
        const { name, registration, operator, userevent } = req.body

        const userExists = await User.findOne({registration})

        if(userExists) {
            return res.json(userExists)
        }

        const user = await User.create({
            name,
            registration,
            operator,
            userevent
        })

        return res.json(user)
    }

    //Função não será utilizada
    /*async login(req, res) {
        const { _id } = req.body
        
        const loggedUser = await User.findOne({_id})
        const permissionLogged = loggedUser.operator

        if(permissionLogged == "1" || permissionLogged == "2") {
            return res.json(loggedUser)
        }

        return res.json({ok: false })
    },*/
}