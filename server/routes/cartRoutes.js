const router = require('express').Router()
const CartController = require('../controllers/CartController')

router.get('/', CartController.listCart)
router.post('/:ProductId', CartController.addToCart)
router.put('/:id', CartController.editAmount)
router.delete('/:id', CartController.delete)


module.exports = router