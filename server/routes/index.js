const route = require('express').Router()
const Controller = require('../controllers/Controller')
const UserController = require('../controllers/UserController')
const {authentication} = require('../middlewares/authentication')
const {authorization} = require('../middlewares/authorization')

route.post('/register', UserController.register)
route.post('/login', UserController.login)

route.get('/products', authentication, Controller.getProducts)
route.post('/products', authentication, authorization, Controller.createProduct)
route.get('/products/:id', authentication, Controller.getProductById)
route.put('/products/:id', authentication, authorization, Controller.editProduct)
route.delete('/products/:id', authentication, authorization, Controller.deleteProduct)

route.get('/cart', authentication, Controller.getCart)
route.post('/cart/:productID', authentication, Controller.addToCart)
route.put('/cart/:id/:operator', authentication, Controller.editCartQty)
route.delete('/cart/:id/:productID/:qty', authentication, Controller.deleteCartItem)

module.exports = route