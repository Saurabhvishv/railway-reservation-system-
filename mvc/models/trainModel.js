const mongoose = require('mongoose');

const trainSchema = new mongoose.Schema({
    trainNo:{
        type:Number,
        required:true,
        unique:true
    },
    trainName:{
        type:String,
        required:true
    },
    "totalCapacity": [
        { "Class": String, "Count": Number, "Price": Number },
        { "Class": String, "Count": Number, "Price": Number }
      ],
    distance: String  ,
    sourceStation:{
        type:String,
        required:true
    },
    destinationStation:{
        type:String,
        required:true
    },
    user: {
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required: true
    },
    days : String ,
  endTime:{ type:String } ,
  startTime:{ type:String} ,
})
module.exports = mongoose.model('Traindetails', trainSchema)