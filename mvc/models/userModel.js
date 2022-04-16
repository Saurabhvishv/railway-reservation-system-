const mongoose = require('mongoose');
const validator = require('validator')
const userSchema = new mongoose.Schema({


    fname: {type: String,required: true},
    lname: {type: String,required: true},
    gender: {type: String,required: true},
    age:{type:Number , min:18 , max:70},
    mobile: {
        type: Number,
        trim: true,
        unique: true,
        required: true,
        validate: {
            validator: function(mobile) {
                return (/^\d{10}$/.test(mobile))
            }, message: 'Please fill a valid mobile number', 
        }

    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: true,
        validate:{
            validator: function(email){
                return (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email));
            },message: "Please provide valid email"
        }   
    },
    password: {
        type: String,
        required: true,
        unique:true
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    Admin:{
        type: Boolean,
        default: false
    }
}, { timestamps: true })

module.exports = mongoose.model('User', userSchema)