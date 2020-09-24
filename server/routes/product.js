const ProductController = require('../controllers/ProductController')
const {authorization, authentication} = require('../middlewares/auth')

const router = require('express').Router()

router.get('/', ProductController.showAllProduct)

router.use(authentication)

router.get('/:productId', authorization, ProductController.showProductById)
router.post('/', authorization, ProductController.createNewProduct)
router.put('/:productId', authorization, ProductController.updateProduct)
router.delete('/:productId', authorization, ProductController.deleteProduct)

module.exports = router