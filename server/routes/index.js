const router = require('express').Router()
const ProductController = require('../controllers/ProductController')
const authorization = require('../middlewares/authorization')
const authentication = require('../middlewares/authentification')
const UserController = require('../controllers/UserController')
const CartController = require('../controllers/CartController.js')


router.post('/login', UserController.login)
router.post('/register', UserController.register)

router.get('/products', ProductController.getProduct)
router.post('/products', authentication, authorization, ProductController.addProduct)
router.get('/products/:id', ProductController.findProduct)
router.put('/products/:id', authentication, authorization, ProductController.updateProduct)
router.delete('/products/:id', authentication, authorization, ProductController.deleteProduct)

router.get('/carts', authentication, CartController.getCart)
router.put('/carts', authentication, CartController.updateCartAndProduct)
router.post('/carts/product/:id', authentication, CartController.addToCart)
router.delete('/carts/:ProductId', authentication, CartController.deleteFromCart)
router.patch('/carts/:ProductId/quantity', authentication, CartController.updateCart)
router.patch('/carts/:ProductId/status', authentication, CartController.updateCart)
module.exports = router 