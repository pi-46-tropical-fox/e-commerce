const router = require('express').Router()
const PurchaseController = require('../controllers/PurchaseController')

router.get('/', PurchaseController.getList)
router.post('/:ProductId', PurchaseController.addPurchase)


module.exports = router