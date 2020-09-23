const CartController = require("../controllers/cartController")
const {authentication, adminAuthorization} = require("../middlewares/userAuth")
const router = require('express').Router()

router.use(authentication)
router.post('/', CartController.createCart)
router.get('/', CartController.getCarts)
router.patch('/:id', CartController.updateQuantity)
router.delete('/:id', CartController.deleteCart)


module.exports = router