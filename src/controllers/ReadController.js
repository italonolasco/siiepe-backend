//Função utilizada para receber o CPF do QRCode e dar presença
const User = require('../models/User')

module.exports = {
    async store(req, res) {
        const { reglogged } = req.headers
        const { regread } = req.params
        const { name, userfunction, readAt } = req.body
    
        const loggedUser = await User.findOne({registration: reglogged})

        const readUser = await User.findOne({registration: regread})

        const permissionLogged = loggedUser.operator
        const permissionRead = readUser.operator

        if((permissionLogged == "1" && permissionRead == "0") || permissionLogged == "2") {

            if(userfunction === 'Apresentador' || userfunction === 'Debatedor') {
                readUser.events.push({
                    name: name,
                    readAt: readAt,
                    readBy: reglogged
                })
            }

            else if(userfunction === 'Ouvinte') {
                readUser.events.push({
                    readAt: readAt,
                    readBy: reglogged
                })                
            }


            await readUser.save()
    
            return res.json(readUser)
        }

        console.log("Você não possui autorização")
        return res.json({ ok: false })

    }
}