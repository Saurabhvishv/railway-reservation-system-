const mongoose = require('mongoose');
const validator = require('validator')
const adminSchema = new mongoose.Schema({


    fname: {type: String,required: true},
    lname: {type: String,required: true},
    gender: {type: String,required: true},
    age: {type: String,required: true},
    mobile: {
        type: Number,
        trim: true,

        unique: true,
        required: 'Mobile Number is required',
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
        required: 'passward is required'
    },
    
    isDeleted: {
        type: Boolean,
        default: false
    }
}, { timestamps: true })

module.exports = mongoose.model('Admin', adminSchema)