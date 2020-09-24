const route = require('express').Router()
const controller = require('../controllers/CartController')
const { authentication } = require('../middlewares/auth')

route.get('/', authentication, controller.showCart)
route.post('/checkout', authentication, controller.checkoutCart)
route.post('/:productId', authentication , controller.createCart)
route.delete('/:id', authentication, controller.deleteCart)
route.put('/:id', authentication, controller.editCart)

module.exports = route