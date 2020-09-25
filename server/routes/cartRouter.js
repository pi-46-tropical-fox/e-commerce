const router = require('express').Router()
const CartController = require('../controller/CartController')
const { cartAuthorization } = require('../middlewares/auth')

router.post('/', CartController.addItem)
router.post('/checkout', CartController.checkout)
router.get('/', CartController.getCartItems)

router.put('/:id', cartAuthorization, CartController.updateQuantity)
router.delete('/:id', cartAuthorization, CartController.deleteItem)


module.exports = router
