const WishlistController = require('../controllers/WishlistController')

const router = require('express').Router()

router.get('/', WishlistController.showMyWishlist)
router.post('/:productId', WishlistController.createNewWishlist)
router.delete('/:productId', WishlistController.deleteWishlist)

module.exports = router