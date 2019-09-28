//Função utilizada para receber o CPF do QRCode e dar presença
const User = require('../models/User')

module.exports = {
    async store(req, res) {
        const { cpflogged } = req.headers
        const { cpfread } = req.params
        const { name, readAt } = req.body

        const loggedUser = await User.findOne({cpf: cpflogged})
        const readUser = await User.findOne({cpf: cpfread})

        const permissionLogged = loggedUser.operator
        const permissionRead = readUser.operator

        if((permissionLogged == "1" && permissionRead == "0") || permissionLogged == "2") {

            readUser.events.push({
                name: name,
                readAt: readAt,
                readBy: cpflogged
            })

            await readUser.save()
    
            return res.json(readUser)
        }

        console.log("Você não possui autorização")
        return res.json({ ok: false })

    }
}