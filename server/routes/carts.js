const CartController = require("../controllers/cartController")
const {authentication, adminAuthorization, userAuthorization} = require("../middlewares/userAuth")
const router = require('express').Router()

router.use(authentication)
router.post('/', CartController.createCart)
router.get('/', CartController.getCarts)
router.patch('/checkout', CartController.checkout)
router.patch('/:id',userAuthorization, CartController.updateQuantity)
router.delete('/:id',userAuthorization, CartController.deleteCart)


module.exports = router