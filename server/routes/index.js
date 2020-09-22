const router = require('express').Router()
const productRouter = require('./product.js')
const bannerRouter = require('./banner.js')
const cartRouter = require('./cart.js')
const {authentication} = require('../middlewares/auth.js')
const UserController = require('../controllers/UserController.js')

router.get('/', (req, res) => {
    res.send('Welcome bro!')
  })
  
router.post('/register', UserController.register)
router.post('/login', UserController.login)

router.use(authentication)

router.use('/products', productRouter)
router.use('/banners', bannerRouter)
router.use('/carts', cartRouter)


module.exports = router