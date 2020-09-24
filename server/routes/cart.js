const route = require('express').Router()

const { authentication } = require('../middlewares/auths');

const CartController = require('../controllers/CartController')

route.use(authentication)
route.post('/', CartController.addCart)
route.post('/myCart', CartController.myCart)
route.put('/updateCart', CartController.updateCart)
route.delete('/deleteCart', CartController.deleteCart)

module.exports = route;