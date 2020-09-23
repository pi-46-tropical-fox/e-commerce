const routes = require('express').Router()
const userRoutes = require('./user')
const productRoutes = require('./product')
const bannerRoutes = require('./banner')
const cartRoutes = require('./cart')
const wishlistRoutes = require('./wishlist')

routes.get('/', (req, res, next) => {
    return res.status(200).json({message: "Hellow"})
})

routes.use('/', userRoutes)
routes.use('/', productRoutes)
routes.use('/', bannerRoutes)
routes.use('/', cartRoutes)
routes.use('/', wishlistRoutes)

module.exports = routes