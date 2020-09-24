const route = require('express').Router()

const { authentication, authorization } = require('../middlewares/auths')

const ProductController = require('../controllers/ProductController')

route.get('/', ProductController.showProduct)
route.get('/:id', ProductController.getOneProduct)

route.use(authentication)
route.post('/', ProductController.addProduct)

route.put('/:id', authorization, ProductController.updateProduct)
route.delete('/:id', authorization, ProductController.deleteProduct)

module.exports = route