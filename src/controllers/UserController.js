const User = require('../models/User')

module.exports = {       
    async store(req, res) {
        const { name, registration, operator, userevent, userfunction } = req.body

        const userExists = await User.findOne({registration})

        if(userExists) {
            return res.json(userExists)
        }

        const user = await User.create({
            name,
            registration,
            operator,
            userevent,
            userfunction
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