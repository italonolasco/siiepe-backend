const { Schema, model } = require('mongoose')

const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
    },

    cpf: {
        type: String,
        minlength: 11,
		maxlength: 11
    },

    registration: {
        type: String,
        minlength: 4,
        maxlength: 4,
        required: true
    },

    //Diz se é voluntário (1), admin (2), ou comum (0). 
    operator: {
        type: String,
        required: true,
    },

    events: [{
        name: {
            type: String
        },

        readAt: {
            type: Date
        },
        
        readBy: {
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