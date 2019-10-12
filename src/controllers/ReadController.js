//Função utilizada para receber o CPF do QRCode e dar presença
const User = require('../models/User')

module.exports = {
    async store(req, res) {      
        const { reglogged } = req.headers
        const readings = req.body

        res.json({ok: true }) //Sempre que recebido será enviado um ok (200). Do jeito implementado, nunca será enviado algo diferente

        let flag = false

        let dateRead = ''        
    
        const loggedUser = await User.findOne({registration: reglogged})
        const permissionLogged = loggedUser.operator
        
        readings.forEach(async element => {
            const {qrCodeData, name, userfunction, readAt, shift } = element
            const readUser = await User.findOne({registration: qrCodeData})

            console.log(readUser)

            if(readUser) {
                const permissionRead = readUser.operator
    
                const date = new Date(readAt).toUTCString().substring(5, 16)
                
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
                    }
                }
        
                else {
                    console.log("Você não possui autorização")
                }  
            }      
        })
    } 
}