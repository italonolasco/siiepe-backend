const { Schema, model } = require('mongoose')

const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
    },

    registration: {
        type: String,
        minlength: 5,
        maxlength: 5,
        required: true
    },

    //Diz se é admin (2), colaborador (1), ou comum (0). 
    operator: {
        type: String,
        required: true
    },

    userevent: {
        type: String,
        required: true
    },

    userfunction: {
        type: String
    },
    
    events: [{
        userfunction: {
            type: String
        },
        
        name: {
            type: String
        },

        readAt: {
            type: Date
        },
        
        readBy: {
            type: String
        },

        shift: {
            type: String
        }
    }],

    counter: {
        type: Number,
        default: 0
    },
},
{
    timestamps: true
}) 

module.exports = model('User', UserSchema)