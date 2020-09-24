const router = require('express').Router()
const CartController = require('../controllers/CartController')
const ProductController = require('../controllers/ProductController')
const TransactionController = require('../controllers/TransactionController')
const UserController = require('../controllers/UserController')
const { authentication, authorization } = require('../middlewares/auth')

router.get('/', (req, res) => {
    res.send('Hello World!')
})

router.post('/register', UserController.register)
router.post('/login', UserController.login)

router.use(authentication)
router.get('/products', ProductController.showProducts)
router.post('/products', authorization,ProductController.addProduct)
router.get('/products/:productId', authorization, ProductController.getProductById)
router.put('/products/:productId', authorization, ProductController.updateProduct)
router.delete('/products/:productId', authorization, ProductController.deleteProduct)

router.get('/cart', CartController.showCart)
router.post('/cart/:productId', CartController.addCart)
router.put('/cart', CartController.checkout)
router.delete('/cart/:id', CartController.deleteCart)

router.get('/transaction', TransactionController.showTransactionList)

module.exports = router