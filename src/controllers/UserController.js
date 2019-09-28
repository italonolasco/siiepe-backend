const User = require('../models/User')

module.exports = {
    async login(req, res) {
        const { cpf } = req.body
        
        const loggedUser = await User.findOne({cpf})
        const permissionLogged = loggedUser.operator

        if(permissionLogged == "1" || permissionLogged == "2") {
            return res.json(loggedUser)
        }

        return res.json({ok: false })
    },
    
    async store(req, res) {
        const { name, cpf, registration, operator } = req.body

        const userExists = await User.findOne({cpf})

        if(userExists) {
            return res.json(userExists)
        }

        const user = await User.create({
            name,
            cpf,
            registration,
            operator
        })

        return res.json(user)
    }
}