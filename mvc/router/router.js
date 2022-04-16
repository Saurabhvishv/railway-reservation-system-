const express = require('express');

const router = express.Router();

const usercontroller=require("../controllers/userController")
const traincontroller=require("../controllers/traincontroller")
const Middleware = require("..//middlewares/middleware")

//USER API
router.post('/User',usercontroller.registerUser)
router.post('/Login',usercontroller.login)
router.post('/Train',traincontroller.createTrain)
// router.get('/User/:userId/profile',Middleware.Auth,usercontroller.GetUsers)
// router.put('/User/:userId/profile',Middleware.Auth,usercontroller.updateUser)


module.exports = router;