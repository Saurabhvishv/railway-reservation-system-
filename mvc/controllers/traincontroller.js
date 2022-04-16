const UserModel = require('../models/userModel.js')
const jwt = require("jsonwebtoken")
const mongoose = require("mongoose")
const trainModel = require("../models/trainModel.js")
const Usercontroller = require("./userController")

const isValidRequestBody = function (requestBody) {
    return Object.keys(requestBody).length > 0
}
const isValidObjectId = function (objectId) {
    return mongoose.Types.ObjectId.isValid(objectId)
}


//Create User
const createTrain = async function (req, res) {
    try {
        const requestBody = req.body;
        const userId =  requestBody.user;
        const userIdFromToken = req.User.userId;
        if (!isValidRequestBody(requestBody)) {
            res.status(400).send({ status: false, message: 'Invalid request parameters. Please provide User details' })
        }
        if (userIdFromToken!= userId) {
            return res.status(401).send({ status: false, msg: "userId does not match by given ID" })
        }
        if (!isValidObjectId(user)) {
            return res.status(400).send({ status: false, Message: "Please provide vaild askedBy ID" })
        }
        let { trainNo, trainName, totalcapacity,distance,sourcestation, destinationstation, days, endTime, startTime} = requestBody
        if(!trainNo || !trainName || !totalcapacity || !distance || !sourcestation || !destinationstation || !days ||!endTime || !startTime){
            return res.status(400).json({error:"feild the details all"})
        }
        
       
            const newTrain = { trainNo, trainName, totalcapacity,distance,sourcestation, destinationstation, days, endTime, startTime}

        const data = await UserModel.create(newTrain);

        res.status(201).send({ status: true, message: 'Created successfull', data: data })
    } catch (error) {
        res.status(500).send({ status: false, message: error.message });
    }
}
module.exports.createTrain = createTrain;
