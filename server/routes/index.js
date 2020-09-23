const CartController = require('../controllers/CartController')
const ProductController = require('../controllers/ProductController')
const UserController = require('../controllers/UserController')
const { authentication, authorization } = require('../middlewares/auth')
const route = require('express').Router()

route.get('/', (req,res) => {
    res.send('Hello World')
})

route.post('/register', UserController.register)
route.post('/login', UserController.login)

route.use(authentication)

//Product Route
route.post('/product', authorization, ProductController.add)
route.get('/product', ProductController.show)
route.get('/product/:id', ProductController.showById)
route.put('/product/:id', authorization, ProductController.update)
route.delete('/product/:id', authorization, ProductController.delete)

//Cart Route
route.post('/cart/:ProductId', CartController.add)
route.get('/cart', CartController.show)
route.delete('/cart/:id', CartController.delete)
route.put('/cart/:id', CartController.update)
route.delete('/checkout', CartController.checkout)

module.exports = route