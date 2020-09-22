const CheckoutController = require('../controllers/CheckoutController')

const router = require('express').Router()

router.get('/', CheckoutController.checkoutProduct)

module.exports = router