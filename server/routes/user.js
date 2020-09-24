const route = require('express').Router()

const { authentication } = require('../middlewares/auths')

const UserController = require('../controllers/UserController')

route.post('/register', UserController.registerUser)
route.post('/login', UserController.loginUser)


route.get('/user/category/:category', UserController.getCategory)
route.post('/user/checkOut', authentication, UserController.checkOut)


module.exports = route