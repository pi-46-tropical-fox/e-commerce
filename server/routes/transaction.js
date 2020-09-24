const TransactionController = require('../controllers/TransactionController')

const router = require('express').Router()

router.get('/', TransactionController.showMyHistoryTransaction)

module.exports = router