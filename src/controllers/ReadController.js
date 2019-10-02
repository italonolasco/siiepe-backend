//Função utilizada para receber o CPF do QRCode e dar presença
const User = require('../models/User')

module.exports = {
    async store(req, res) {      
        const { reglogged } = req.headers
        const { regread } = req.params
        const { name, userfunction, readAt } = req.body

        let flag = false

        const shiftM1 = '08:30'
        const changeM = '10:30'
        const shiftM2 = '12:30'
        const shiftA1 = '13:30'
        const changeA = '15:30'
        const shiftA2 = '18:00'
    
        const loggedUser = await User.findOne({registration: reglogged})
        const readUser = await User.findOne({registration: regread})

        const permissionLogged = loggedUser.operator
        const permissionRead = readUser.operator

        const date = new Date(readAt).toUTCString().substring(5, 16)
        const hour = new Date(readAt).toUTCString().substring(17, 22)
        
        let shift = ''
        let dateRead = ''

        if(hour >= shiftM1 && hour < changeM) {
            shift = 'm1'
        }
        
        else if(hour >= changeM && hour <= shiftM2) {
            shift = 'm2'
        }
        
        else if(hour >= shiftA1 && hour < changeA) {
            shift = 'a1'
        }
        
        else if(hour >= changeA && hour <= shiftA2) {
            shift = 'a2'
        }

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