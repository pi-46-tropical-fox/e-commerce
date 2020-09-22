const router = require('express').Router()
const CartController = require('../controllers/CartController.js')

// const {authorizationCart} = require('../middlewares/auth.js')

router.get('/', CartController.getCarts)

router.post('/:id', CartController.postCart)
router.get('/:id', CartController.getCart)
router.put('/:id/add', CartController.addCart)
router.put('/:id/sub', CartController.minCart)
router.delete('/:id', CartController.deleteCart)

module.exports = router