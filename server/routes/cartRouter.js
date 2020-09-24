const router = require('express').Router()
const CartController = require('../controller/CartController')

router.get('/', CartController.getCartItems)
router.post('/', CartController.addItem)
router.delete('/:id', CartController.deleteItem)


module.exports = router
