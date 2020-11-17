const router = require('express').Router()
const productRouter = require('./product.js')
const bannerRouter = require('./banner.js')
const cartRouter = require('./cart.js')

const UserController = require('../controllers/UserController.js')
const ProductController = require('../controllers/ProductController.js')
const BannerController = require('../controllers/BannerController.js')

router.get('/', (req, res) => {
    res.send('Welcome bro!')
  })
  
router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.get('/products', ProductController.getProducts) //can be accessed without logging in
router.get('/products/:id', ProductController.getProduct) //can be accessed without logging in
router.get('/banners', BannerController.getBanners) //can be accessed without logging in

router.use('/products', productRouter)
router.use('/banners', bannerRouter)
router.use('/carts', cartRouter)


module.exports = router