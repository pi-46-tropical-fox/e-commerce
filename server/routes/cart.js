const cartRoutes = require('express').Router()
const CartController = require('../controllers/cartController')
const { authentication } = require('../middlewares/auth')


cartRoutes.post('/carts/:productId', authentication, CartController.addCart)
cartRoutes.get('/carts', authentication, CartController.getCarts)
cartRoutes.get('/carts/products', authentication, CartController.updateCartsProducts)
cartRoutes.put('/carts/:id', CartController.updateQuantity)
cartRoutes.delete('/carts/:id', authentication, CartController.deleteCart)


module.exports = cartRoutes