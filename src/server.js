const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const routes = require('./routes')

const server = express()

mongoose.connect('mongodb+srv://siiepe:GRI13ii8310@siiepe-ey5eq.mongodb.net/siiepe?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

server.use(cors())
server.use(express.json())
server.use(routes)

server.listen(process.env.PORT || 3333)