//Função utilizada para receber o CPF do QRCode e dar presença
const User = require('../models/User')

module.exports = {
    async store(req, res) {
        const { logged } = req.headers
        const { regread } = req.params
        const { name, readAt } = req.body

        if(logged.length == 11){
            const loggedUser = await User.findOne({cpf: logged})
        }

        else if(logged.length == 4) {  
            const loggedUser = await User.findOne({registration: logged}) 
        }

        const readUser = await User.findOne({registration: regread})

        const permissionLogged = loggedUser.operator
        const permissionRead = readUser.operator

        if((permissionLogged == "1" && permissionRead == "0") || permissionLogged == "2") {

            readUser.events.push({
                name: name,
                readAt: readAt,
                readBy: reglogged
            })

            await readUser.save()
    
            return res.json(readUser)
        }

        console.log("Você não possui autorização")
        return res.json({ ok: false })

    }
}