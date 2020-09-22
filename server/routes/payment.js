const PaymentController = require('../controllers/PaymentController')

const router = require('express').Router()

router.post('/', PaymentController.pay)

module.exports = router