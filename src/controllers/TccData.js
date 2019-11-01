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
    }
}