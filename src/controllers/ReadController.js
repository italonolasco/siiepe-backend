//Função utilizada para receber o CPF do QRCode e dar presença
const User = require('../models/User')

module.exports = {
    async store(req, res) {      
        const { reglogged } = req.headers
        const { regread } = req.params
        const { name, userfunction, readAt, shift } = req.body

        let flag = false
    
        const loggedUser = await User.findOne({registration: reglogged})
        const readUser = await User.findOne({registration: regread})

        const permissionLogged = loggedUser.operator
        const permissionRead = readUser.operator

        const date = new Date(readAt).toUTCString().substring(5, 16)

        let dateRead = ''

        if((permissionLogged == "1" && permissionRead == "0") || permissionLogged == "2") {
            if(readUser.events.length != 0) {
                readUser.events.forEach(async element => {
                    dateRead = element.readAt.toUTCString().substring(5, 16)                    
                    
                    if(date == dateRead && shift == element.shift) {
                        console.log('Você já possui leitura neste subturno')
                        flag = true
                    }
                }, [flag])
                               
                if(!flag) {
                    readUser.events.push({
                        userfunction: userfunction,
                        name: name,
                        readAt: readAt,
                        readBy: reglogged,
                        shift: shift
                    })
                    
                    readUser.counter++

                    await readUser.save()
                    return res.json(readUser) 
                }
                
            }

            else {
                readUser.events.push({
                    userfunction: userfunction,
                    name: name,
                    readAt: readAt,
                    readBy: reglogged,
                    shift: shift
                })
    
                readUser.counter++

                await readUser.save()
                return res.json(readUser)
            }
        }

        else {
            console.log("Você não possui autorização")
            return res.json({ ok: false })
        }

    } 
}