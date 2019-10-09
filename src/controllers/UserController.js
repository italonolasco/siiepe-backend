const User = require('../models/User')

module.exports = {
    async certificatePresenter(req, res) {
        let usersCertificate = []

        const users = await User.find({})

        users.forEach(element => {
            if((element.userevent == 'ENPOS' || element.userevent == 'CIC' || element.userevent == 'CIT' || element.userevent == 'CEG' || element.userevent == 'CEC') && element.counter >= 1 && element.eventNames.userfunction == 'A') {
                usersCertificate.push(element)
            }   
        })

        return res.json(usersCertificate)
    },

    async certificateListener(req, res) {
        let usersCertificate = []

        const users = await User.find({})

        users.forEach(element => {           
            if(element.counter >= 8) {
                usersCertificate.push(element)
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