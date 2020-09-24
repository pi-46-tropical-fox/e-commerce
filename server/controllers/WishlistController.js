const {Wishlist, Product} = require('../models')

class WishlistController {
    static async showMyWishlist(req, res, next){
        try {
            const wishlists = await Wishlist.findAll({
                include: [Product],
                where: {
                    UserId: req.user.id
                }
            })
            return res.status(200).json(wishlists)
        } catch (err) {
            console.log(err);
            return next(err)
        }
    }
    static async createNewWishlist(req, res, next){
        try {
            let obj = {
                ProductId: req.params.productId,
                UserId: req.user.id
            }
            const data = await Wishlist.findOne({
                where: {
                    ProductId: req.params.productId,
                    UserId: req.user.id
                }
            })
            if(data){
                throw {name: 'ExistingProduct'}
            }else{
                const wishlist = await Wishlist.create(obj)
                return res.status(201).json({wishlist, message: 'Product added to your wishlist'})
            }
        } catch (err) {
            return next(err)
        }
    }
    static async deleteWishlist(req, res, next){
        try {
            const wishlist = await Wishlist.destroy({
                where: {
                    ProductId: req.params.productId,
                    UserId: req.user.id
                }
            })
            return res.status(200).json({message: 'Product removed from your wishlist'})
        } catch (err) {
            return next(err)
        }
    }
}

module.exports = WishlistController