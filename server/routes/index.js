const router = require('express').Router()
const productRouter = require('./product')
const categoryRouter = require('./category')
const cartRouter = require('./cart')
const checkoutRouter = require('./checkout')
const profileRouter = require('./profile')
const transactionRoute = require('./transaction')
const wishlistRouter = require('./wishlist')
const UserController = require('../controllers/UserController')
const {authentication, customerAuthorization} = require('../middlewares/auth')

router.get('/', (req, res) => {
    res.send('Welcome!')
})

router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.use('/products', productRouter)
router.use('/categories', categoryRouter)

router.use(authentication)

router.use(customerAuthorization)

router.use('/carts', cartRouter)
router.use('/checkout', checkoutRouter)
router.use('/profile', profileRouter)
router.use('/transactions', transactionRoute)
router.use('/wishlists', wishlistRouter)

module.exports = router