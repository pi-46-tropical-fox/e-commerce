const router = require('express').Router()
const CartController = require('../controller/CartController')

router.post('/', CartController.addItem)
router.post('/checkout', CartController.checkout)
router.put('/:id', CartController.updateQuantity)
router.get('/', CartController.getCartItems)
router.delete('/:id', CartController.deleteItem)


module.exports = router
