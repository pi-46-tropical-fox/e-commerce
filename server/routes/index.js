const router = require('express').Router()
const userController = require('../controllers/userController')
const prodController = require('../controllers/productController')
const cartController = require('../controllers/cartController')
const { authentication, authorization } = require('../middlewares/auth')

//User
router.post('/register', userController.register)
router.post('/login',userController.login)

//Products
router.get('/', prodController.show)
router.post('/products', authentication, authorization, prodController.add)
router.get('/products/:id',authentication, authorization, prodController.find)
router.put('/products/:id',authentication, authorization, prodController.edit)
router.delete('/products/:id',authentication, authorization, prodController.remove)

//Cart
router.get('/carts', authentication, cartController.show)
router.post('/carts/:id', authentication, cartController.add)
router.get('/carts/:id', authentication, cartController.find)
router.patch('/carts', authentication, cartController.edit)
router.patch('/carts/quantity/:cartId', authentication, cartController.editQuantity)
router.delete('/carts/:id',authentication, cartController.remove)


module.exports = router