const CartController = require('../controllers/CartController')
const {cartAuthorization} = require('../middlewares/auth')

const router = require('express').Router()

router.get('/', CartController.showMyCart)
router.post('/:productId', CartController.addToMyCart)
router.delete('/:productId', cartAuthorization, CartController.deleteProductFromMyCart)
router.put('/:productId', cartAuthorization, CartController.decreaseQtyFromMyCart)

module.exports = router