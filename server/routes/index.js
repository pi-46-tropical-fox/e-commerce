const route = require('express').Router()
const productRoute = require('../routes/product')
const userRoute = require('./user')
const cartRoute = require('./cart')

route.get('/', (req, res) => {
    res.send('The Server Is Working')
})

route.use('/product', productRoute)
route.use('/auth', userRoute)
route.use('/cart', cartRoute)

module.exports = route