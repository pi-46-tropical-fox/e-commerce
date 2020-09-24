const router = require('express').Router()
const ProductController = require('../controllers/ProductController.js')
const CartController = require('../controllers/CartController.js')

const {authorizationProduct, authenticationAdmin, authenticationCustomer} = require('../middlewares/auth.js')

router.post('/:id/cart', authenticationCustomer, CartController.postCart)

router.use(authenticationAdmin)

router.post('/', ProductController.postProduct)
router.put('/:id', authorizationProduct, ProductController.editProduct)
router.delete('/:id', authorizationProduct, ProductController.deleteProduct)





module.exports = router