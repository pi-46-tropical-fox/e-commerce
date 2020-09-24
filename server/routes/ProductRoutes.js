const route = require('express').Router()
const ProductController = require('../controllers/ProductController')
const { authorization } = require('../middlewares/auth')

route.post('/', authorization, ProductController.addProduct)
route.get('/', ProductController.getAllProduct)
route.get('/:id', ProductController.detailProduct)
route.put('/:id', authorization, ProductController.updateProduct)
route.delete('/:id', authorization, ProductController.deleteProduct)


module.exports = route