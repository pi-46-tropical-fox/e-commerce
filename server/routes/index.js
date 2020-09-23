const router = require('express').Router()
const { request } = require('express')
const userController = require('../controllers/userController')
const Controller = require('../controllers/controller')
const cartController = require('../controllers/cartController')
const { authentication, authorization } = require('../middleware/auth')


router.post('/login',userController.login)
router.post('/register',userController.register)

// ADMIN & CUSTOMER
router.get('/products',Controller.list)

// ADMIN
router.post('/products',authentication,authorization,Controller.add)
router.get('/products/:id',authentication,authorization,Controller.getOne)
router.put('/products/:id',authentication,authorization,Controller.edit)
router.delete('/products/:id',authentication,authorization,Controller.delete)

// CUSTOMER
router.get('/carts',authentication,cartController.get)
router.post('/carts/:productId',authentication,cartController.add)
router.get('/carts/:productId',authentication,cartController.getOne)
router.put('/carts/:id',authentication,cartController.edit)
router.delete('/carts/:id',authentication,cartController.delete)

module.exports = router