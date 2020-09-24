const CheckoutController = require('../controllers/CheckoutController')

const router = require('express').Router()

router.post('/', CheckoutController.checkoutProduct)

module.exports = router