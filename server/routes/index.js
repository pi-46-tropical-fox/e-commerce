const route = require('express').Router()
const UserController = require('../controllers/UserController')
const ProductRouter = require('./ProductRoutes')
const cartRouter = require('./cartRoutes')
const purchaseRouter = require('./purchaseRoutes')
const { authentication } = require('../middlewares/auth')

route.post('/login', UserController.login)
route.post('/register', UserController.register)


route.use(authentication)
route.use('/products', ProductRouter)
route.use('/carts', cartRouter)
route.use('/purchase', purchaseRouter)

module.exports = route