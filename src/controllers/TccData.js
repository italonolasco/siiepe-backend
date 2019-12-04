const User = require('../models/User')

module.exports = {
    async getPresentation(req, res) {
        const users = await User.find({userfunction: 'AO'})

        let date = ''
        let day1 = 0
        let day2 = 0
        let day3 = 0
        let day4 = 0
        let day5 = 0

        users.forEach(element => {
            if(element.events.length >= 1) {
                element.events.forEach(event => {
                    date = event.readAt.toUTCString().substring(5, 16)
                    if(date == '21 Oct 2019' && event.userfunction == 'A') {
                        day1++
                    }

                    else if(date == '22 Oct 2019' && event.userfunction == 'A') {
                        day2++
                    }
                    
                    else if(date == '23 Oct 2019' && event.userfunction == 'A') {
                        day3++
                    }

                    else if(date == '24 Oct 2019' && event.userfunction == 'A') {
                        day4++
                    }
                    
                    else if(date == '25 Oct 2019' && event.userfunction == 'A') {
                        day5++
                    }
                })
            }
        })

        console.log(day1, day2, day3, day4, day5)
        res.json({ok: true})
    },


    async getListener(req, res) {
        const users = await User.find({userfunction: 'AO'})

        let date = ''
        let day1 = 0
        let day2 = 0
        let day3 = 0
        let day4 = 0
        let day5 = 0

        users.forEach(element => {
            if(element.events.length >= 1) {
                element.events.forEach(event => {
                    date = event.readAt.toUTCString().substring(5, 16)
                    if(date == '21 Oct 2019') {
                        day1++
                    }

                    else if(date == '22 Oct 2019') {
                        day2++
                    }
                    
                    else if(date == '23 Oct 2019') {
                        day3++
                    }

                    else if(date == '24 Oct 2019') {
                        day4++
                    }
                    
                    else if(date == '25 Oct 2019') {
                        day5++
                    }
                })
            }
        })

        console.log(day1, day2, day3, day4, day5)
        res.json(users.length)
    },

    async getCollaborator(req, res) {
        const users = await User.find({operator: 1})

        let date = ''
        let day1 = 0
        let day2 = 0
        let day3 = 0
        let day4 = 0
        let day5 = 0

        users.forEach(element => {
            if(element.events.length >= 1) {
                element.events.forEach(event => {
                    date = event.readAt.toUTCString().substring(5, 16)
                    if(date == '21 Oct 2019') {
                        day1++
                    }

                    else if(date == '22 Oct 2019') {
                        day2++
                    }
                    
                    else if(date == '23 Oct 2019') {
                        day3++
                    }

                    else if(date == '24 Oct 2019') {
                        day4++
                    }
                    
                    else if(date == '25 Oct 2019') {
                        day5++
                    }
                })
            }
        })

        console.log(day1, day2, day3, day4, day5)
        res.json(users)
    },

    async getDebater(req, res) {
        const users = await User.find({userfunction: 'DEB'})

        let date = ''
        let day1 = 0
        let day2 = 0
        let day3 = 0
        let day4 = 0
        let day5 = 0

        users.forEach(element => {
            if(element.events.length >= 1) {
                element.events.forEach(event => {
                    date = event.readAt.toUTCString().substring(5, 16)
                    if(date == '21 Oct 2019') {
                        day1++
                    }

                    else if(date == '22 Oct 2019') {
                        day2++
                    }
                    
                    else if(date == '23 Oct 2019') {
                        day3++
                    }

                    else if(date == '24 Oct 2019') {
                        day4++
                    }
                    
                    else if(date == '25 Oct 2019') {
                        day5++
                    }
                })
            }
        })

        console.log(day1, day2, day3, day4, day5)
        res.json(users.length)
    },

    async getReaders(req, res) {
        let readers = []
        let flag = 0


        const users = await User.find()

        users.forEach(element => {
            if(element.events.length != 0) {
                element.events.forEach(event => {   
                    if(readers.length == 0) {
                        readers.push(event.readBy)
                    }

                    else {
                        readers.forEach(read => {
                            if(read == event.readBy) {
                                flag = 1
                            }
                        })

                        if(flag == 0) {
                            readers.push(event.readBy)
                        }

                        flag = 0
                    }
                })
            }
        })

        return res.json(readers.length)
    },

    async getInscritosPorEventos(req, res) {
        let cic = 0
        let cit = 0
        let cec = 0
        let ceg = 0
        let enpos = 0
        let ouvinte = 0
        let organizacao = 0
        a = []

        const users = await User.find()

        users.forEach(element => {
            if(element.userevent == 'CIC') {
                cic++
            }

            else if(element.userevent == 'CIT') {
                cit++
            }

            else if(element.userevent == 'CEC') {
                cec++
            }

            else if(element.userevent == 'CEG') {
                ceg++
            }

            else if(element.userevent == 'ENPOS') {
                enpos++
            }

            else if (element.userevent == 'SIEPE' && element.userfunction == 'AO') {
                ouvinte++
            }

            else {
                organizacao++
                a.push(element)

            }
        })

        console.log(cic, cit, cec, ceg, enpos, ouvinte, organizacao)
        return res.json(a)
    },

    async getInscritosCIC(req, res) {
        let apresentadores = 0
        let colaboradores = 0
        let debatedores = 0
        let admin = 0

        const users = await User.find()

        users.forEach(element => {
            if(element.userevent == 'CIC') {
                if(element.userfunction == 'AO') {
                    apresentadores++
                }
                
                else if(element.userfunction == 'DEB') {
                    debatedores++
                }

                else if(element.operator == '1') {
                    colaboradores++
                }

                else if(element.operator == '2') {
                    admin++
                }
            }
        })

        console.log('cic:', apresentadores, debatedores, colaboradores, admin)
        return res.json(200)
    },

    async getInscritosCIT(req, res) {
        let apresentadores = 0
        let colaboradores = 0
        let debatedores = 0
        let admin = 0

        const users = await User.find()

        users.forEach(element => {
            if(element.userevent == 'CIT') {
                if(element.userfunction == 'AO') {
                    apresentadores++
                }
                
                else if(element.userfunction == 'DEB') {
                    debatedores++
                }

                else if(element.operator == '1') {
                    colaboradores++
                }

                else if(element.operator == '2') {
                    admin++
                }
            }
        })

        console.log('cit:', apresentadores, debatedores, colaboradores, admin)
        return res.json(200)
    },

    async getInscritosCEC(req, res) {
        let apresentadores = 0
        let colaboradores = 0
        let debatedores = 0
        let admin = 0

        const users = await User.find()

        users.forEach(element => {
            if(element.userevent == 'CEC') {
                if(element.userfunction == 'AO') {
                    apresentadores++
                }
                
                else if(element.userfunction == 'DEB') {
                    debatedores++
                }

                else if(element.operator == '1') {
                    colaboradores++
                }

                else if(element.operator == '2') {
                    admin++
                }
            }
        })

        console.log('cec:', apresentadores, debatedores, colaboradores, admin)
        return res.json(200)
    },

    async getInscritosCEG(req, res) {
        let apresentadores = 0
        let colaboradores = 0
        let debatedores = 0
        let admin = 0

        const users = await User.find()

        users.forEach(element => {
            if(element.userevent == 'CEG') {
                if(element.userfunction == 'AO') {
                    apresentadores++
                }
                
                else if(element.userfunction == 'DEB') {
                    debatedores++
                }

                else if(element.operator == '1') {
                    colaboradores++
                }

                else if(element.operator == '2') {
                    admin++
                }
            }
        })

        console.log('ceg:', apresentadores, debatedores, colaboradores, admin)
        return res.json(200)
    },

    async getInscritosENPOS(req, res) {
        let apresentadores = 0
        let colaboradores = 0
        let debatedores = 0
        let admin = 0

        const users = await User.find()

        users.forEach(element => {
            if(element.userevent == 'ENPOS') {
                if(element.userfunction == 'AO') {
                    apresentadores++
                }
                
                else if(element.userfunction == 'DEB') {
                    debatedores++
                }

                else if(element.operator == '1') {
                    colaboradores++
                }

                else if(element.operator == '2') {
                    admin++
                }
            }
        })

        console.log('enpos:', apresentadores, debatedores, colaboradores, admin)
        return res.json(200)
    },
}