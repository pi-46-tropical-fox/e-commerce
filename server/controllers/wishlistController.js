const { Wishlist, Product } = require('../models')

class WishlistController {
    static addWishlist (req, res, next) {
        let wishlistObj = {
            ProductId: req.params.productId,
            //TOBE UPDATED BY REQ USER DATA
            UserId: req.userData.id
        }

        Wishlist.create(wishlistObj)
            .then(data => {
                return res.status(201).json(data)
            })
            .catch(err => {
                console.log(err)
                return next(err)
            })
    }

    static getWishlists (req, res, next) {
        Wishlist.findAll({
            include: [Product]
        })
            .then(data => {
                return res.status(200).json(data)
            })
            .catch(err => {
                console.log(err)
                return next(err)
            })
    }

    static deleteWishlist (req, res, next) {
        Wishlist.destroy({
            where: {
                Id: req.params.id
            }
        })
            .then(data => {
                return res.status(200).json({message: "Successfully delete wishlist product"})
            })
            .catch(err => {
                return next(err)
            })
    }
}

module.exports = WishlistController