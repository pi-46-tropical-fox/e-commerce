const wishlistRoutes = require('express').Router()
const WishlistController = require('../controllers/wishlistController')
const { authentication } = require('../middlewares/auth')


wishlistRoutes.post('/wishlists/:productId', authentication, WishlistController.addWishlist)
wishlistRoutes.get('/wishlists', authentication, WishlistController.getWishlists)
wishlistRoutes.delete('/wishlists/:id', authentication, WishlistController.deleteWishlist)


module.exports = wishlistRoutes