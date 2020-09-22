const router = require('express').Router()
const ProductController = require('../controllers/ProductController')
const authorization = require('../middlewares/authorization')
const authentication = require('../middlewares/authentification')
const UserController = require('../controllers/UserController')
const CartController = require('../controllers/CartController.js')


router.post('/login', UserController.login)
router.post('/register', UserController.register)

router.get('/products', authentication, authorization, ProductController.getProduct)
router.post('/products', authentication, authorization, ProductController.addProduct)
router.get('/products/:id', authentication, ProductController.findProduct)
router.put('/products/:id', authentication, authorization, ProductController.updateProduct)
router.delete('/products/:id', authentication, authorization, ProductController.deleteProduct)

router.get('/carts', CartController.getCart)
router.put('/carts', CartController.updateCartAndProduct)
router.post('/carts/product/:id', CartController.addToCart)
router.delete('/carts/:id', CartController.deleteFromCart)
router.patch('/carts/:id/quantity', CartController.updateCart)
router.patch('/carts/:id/status', CartController.updateCart)
module.exports = router 