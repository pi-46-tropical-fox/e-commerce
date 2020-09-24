const route = require('express').Router()
const CustomerController = require('../controllers/customerController')
const auth = require('../middlewares/auth')
const { authentication } = require('../middlewares/auth')

route.get('/', CustomerController.showProducts)
route.post('/login', CustomerController.login)
route.post('/register', CustomerController.register)
route.post('/addwl/:productId', authentication, CustomerController.addToWishlist)
route.post('/addcart/:productId', authentication, CustomerController.addToCart)
route.get('/cart/:cartId', authentication, CustomerController.getOneCart)
route.get('/cart', authentication, CustomerController.getCart)
route.get('/wishlist', authentication, CustomerController.getWishlist)
route.put('/updatecart/', authentication, CustomerController.updateCart)
route.delete('/deletewl/:wlId', authentication, CustomerController.deleteWishlist)
route.delete('/deletecart/:cartId', authentication, CustomerController.deleteCart)
route.put('/checkout', authentication, CustomerController.checkout)

module.exports = route