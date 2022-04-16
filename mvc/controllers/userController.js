const UserModel = require('../models/userModel.js')
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const mongoose = require("mongoose")
const trainModel = require("../models/trainModel.js")

const isValidRequestBody = function (requestBody) {
    return Object.keys(requestBody).length > 0
}


//Create User
const registerUser = async function (req, res) {
    try {
        const requestBody = req.body;
        if (!isValidRequestBody(requestBody)) {
            res.status(400).send({ status: false, message: 'Invalid request parameters. Please provide User details' })
        }
        let { fname, lname, gender,age,mobile, email, password} = requestBody
        if(!fname || !lname || !gender || !age || !mobile || !email || !password){
            return res.status(400).json({error:"feild the details all"})
        }
       
        
        const isEmailAlreadyUsed = await UserModel.findOne({ email });
        if (isEmailAlreadyUsed) {
            res.status(400).send({ status: false, message: `${email} mail is already registered` })
            return
        }
        if (!((password.length > 7) && (password.length < 16))) {
            res.status(400).send({ status: false, message: `Password length should be between 8 and 15.` })
            return 
        }
        const isPhoneAlreadyUsed = await UserModel.findOne({ mobile });
            if (isPhoneAlreadyUsed) {
                res.status(400).send({ status: false, message: `${mobile}  phone number is already registered` })
                return
            }
            const EncrypPassword = await bcrypt.hash(password, 10)
            const newUser = { fname, lname, gender,age,mobile, email, password, password: EncrypPassword }

        const data = await UserModel.create(newUser);

        res.status(201).send({ status: true, message: 'Created successfull', data: data })
    } catch (error) {
        res.status(500).send({ status: false, message: error.message });
    }
}


//login User
const login = async function (req, res) {
    try {
        const requestBody = req.body
        let email = req.body.email
        let password = req.body.password
        if (email && password) {
            let User = await UserModel.findOne({ email: email})
            if (!User) {
                return res.status(400).send({ status: false, msg: "email does not exist" })
            }
            let decryppasss = await bcrypt.compare(password, User.password);
            if (decryppasss) {
                const token = await jwt.sign({ userId: User._id }, 'Group8', {
                    expiresIn: "3h"
                })
                res.header('x-api-key', token);
                res.status(200).send({ status: true, msg: "success", data: { userId: User._id, token: token } })
            } else {
                res.status(400).send({ status: false, Msg: "Invalid password write correct password" })
            }
        }
    } catch (err) {
        res.status(500).send({ status: false, message: err.message })
    }
}

//User Details
const GetUsers = async function (req, res) {
    try {
        let userId = req.params.userId
        if (req.user.userId != req.params.userId) {
            return res.status(401).send({ status: false, msg: "userId does not match" })
        }
        let findUserId = await UserModel.findOne({ _id: userId })
        if (findUserId) {
            res.status(200).send({ status: true, msg: "User Profile details", data: findUserId })
        }
    } catch (err) {
        res.staus(500).send({ status: false, msg: err.message })
    }
}

// Update Details of users
const updateUser = async function (req, res) {
    try {
        const userId = req.params.userId
        const requestBody = req.body
        const Id = req.user.userId 
        if (!validObject(userId)) {
            res.status(400).send({ status: false, message: `${userId} is invalid` })
            return
        }
        const userFound = await UserModel.findOne({ _id: userId })
        if (!userFound) {
            res.status(401).send({ status: false, message: `User does not exist` })
        }
        if (userId !== Id) {
            res.status(401).send({ status: false, message: `user id doesn't match provide valid user id` })
            return
        }
        if (!isValidRequestBody(requestBody)) {
            res.status(400).send({ status: false, message: `write the user details which you want to update` })
            return
        }
        let { fname, lname, email, phone } = requestBody;
        let updateUser = {};

            updateUser['fname'] = fname 
            updateUser['lname'] = lname 
        
        if (isValid(email)) {
            if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email.trim()))) {
                res.status(400).send({ status: false, message: `Email should be a valid email address` })
            }
            const duplicateEmail = await UserModel.find({ email: email })
            if (duplicateEmail.length) {
                res.status(400).send({ status: false, message: 'email already exists' })
            }
            updateUser['email'] = email
        }
        if (isValid(mobile)) {
            if (!(/^(1\s|1|)?((\(\d{3}\))|\d{3})(\-|\s)?(\d{3})(\-|\s)?(\d{4})$/.test(phone.trim()))) {
                res.status(400).send({ status: false, message: `Please provide valid phone number` })
            }
            const duplicatePhone = await UserModel.find({ mobile: mobile })
            if (duplicatePhone.length) {
                res.status(400).send({ status: false, message: 'phone already exists' })
            }
            updateUser['mobile'] = mobile
        }
        const updatedUserData = await UserModel.findOneAndUpdate({ _id: userId }, updateUser, { new: true })
        res.status(201).send({ status: true, data: updatedUserData })
    } catch (error) {
        res.status(500).send({ status: false, msg: error.message });
    }
}
module.exports.registerUser = registerUser;
module.exports.login = login;
module.exports.GetUsers = GetUsers
module.exports.updateUser = updateUser