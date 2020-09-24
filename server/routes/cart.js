const router = require('express').Router()
const CartController = require('../controllers/CartController.js')

const {authorizationCart, authenticationCustomer} = require('../middlewares/auth.js')
router.use(authenticationCustomer)
router.get('/', CartController.getCarts)

router.get('/:id', authorizationCart, CartController.getCart)
router.put('/:id/add', authorizationCart, CartController.addCart)
router.put('/:id/sub', authorizationCart, CartController.minCart)
router.delete('/:id', authorizationCart,CartController.deleteCart)

module.exports = router