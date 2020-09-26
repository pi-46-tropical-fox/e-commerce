'use strict'

const router = require('express').Router()
const CartController = require('../controllers/CartController')
const { authentication } = require('../middlewares/authentication')

router.use(authentication)
router.get('/', CartController.show)
router.put('/', CartController.checkOut)

router.post('/:product_id', CartController.addCart)

router.put('/:product_id', CartController.updatingQtyCart)

router.delete('/:product_id', CartController.removeItemCart)

module.exports = router