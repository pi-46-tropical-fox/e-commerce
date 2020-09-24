'use strict'

const router = require('express').Router()
const CartController = require('../controllers/CartController')
const { authentication } = require('../middlewares/authentication')

router.use(authentication)
router.get('/:user_id', CartController.show)
router.put('/:user_id', CartController.checkOut)

router.post('/:user_id/:product_id', CartController.addCart)

router.put('/:user_id/:product_id', CartController.updatingQtyCart)

router.delete('/:user_id/:product_id', CartController.removeItemCart)

module.exports = router