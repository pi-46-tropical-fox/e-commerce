const CategoryController = require('../controllers/categoryController')
const {authentication, adminAuthorization} = require("../middlewares/userAuth")
const router = require('express').Router()

router.get('/', CategoryController.getCategories)
router.use(authentication)
router.post('/', CategoryController.createCategory)
router.delete('/:id', CategoryController.deleteCategory)


module.exports = router