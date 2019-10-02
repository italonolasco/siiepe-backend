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

    //Diz se é voluntário (1), admin (2), ou comum (0). 
    operator: {
        type: String,
        required: true,
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
        default: 0,
    },
},
{
    timestamps: true
}) 

module.exports = model('User', UserSchema)