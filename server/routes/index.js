const router = require('express').Router()

const routeUser = require('./user')
const routeProduct = require('./product')
const routeCart = require('./cart')

router.get('/', (req,res) => {
    res.send('Server Ecommerce Syukur')
})
router.use('/', routeUser)
router.use('/products', routeProduct)
router.use('/carts', routeCart)

module.exports = router;