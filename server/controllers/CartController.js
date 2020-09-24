const {Cart, Product, Wishlist} = require('../models')

class CartController {
    static async showMyCart(req, res, next){
        try {
            const carts = await Cart.findAll({
                include: [{
                    model: Product
                }],
                where: {
                    UserId: req.user.id
                }
            })
            let grandTotal = {
                qty: 0,
                price: 0
            }
            if(carts.length < 1){
                return res.status(200).json({carts, grandTotal})
            }else{
                for(const el of carts){
                    grandTotal.qty += el.qty
                    grandTotal.price += (el.qty * el.Product.price)
                }
                return res.status(200).json({carts, grandTotal})
            }            
        } catch (err) {
            return next(err)
        }
    }
    static async addToMyCart(req, res, next){
        try {
            let obj = {
                qty: 1,
                status: 'UNPAID',
                UserId: req.user.id,
                ProductId: req.params.productId
            }
            const cart = await Cart.findOne({
                include: [{
                    model: Product
                }],
                where: {
                    ProductId: +req.params.productId,
                    UserId: req.user.id
                }
            })
            const wishlist = await Wishlist.findOne({
                where: {
                    ProductId: +req.params.productId,
                    UserId: req.user.id
                }
            })
            if(cart){
                if(cart.qty < cart.Product.stock){
                    if(wishlist){
                        const deleteWishlist = await Wishlist.destroy({
                            where: {
                                ProductId: req.params.productId,
                                UserId: req.user.id
                            }
                        })
                    }
                    const increment = await cart.increment('qty', {by: 1})
                    return res.status(200).json({cart, message: 'Product updated to your cart'})
                }else{
                    throw {name: 'QtyIsLimit'}
                }
            }else{
                const product = await Product.findByPk(req.params.productId)
                if(product.stock > 0){
                    if(wishlist){
                        const deleteWishlist = await Wishlist.destroy({
                            where: {
                                ProductId: req.params.productId,
                                UserId: req.user.id
                            }
                        })
                    }
                    const cart = await Cart.create(obj)
                    return res.status(201).json({cart, message: 'Product added to your cart'})
                }else{
                    throw {name: 'OutOfStock'}
                }
            }
        } catch (err) {
            return next(err)
        }
    }
    static async deleteProductFromMyCart(req, res, next){
        try {
            const cart = await Cart.destroy({
                where: {
                    ProductId : +req.params.productId,
                    UserId: req.user.id
                }
            })
            return res.status(200).json({message: 'Product deleted from your cart'})
        } catch (err) {
            return next(err)
        }
    }
    static async decreaseQtyFromMyCart(req, res, next){
        try {
            const product = await Cart.findOne({
                include: [{
                    model: Product
                }],
                where: {
                    ProductId: req.params.productId,
                    UserId: req.user.id
                }
            })
            if(product.qty >= 2){
                const decrement = await product.decrement('qty', {by: 1})
                return res.status(200).json({product, message: 'Product updated from your cart'})
            }else{
                const cart = await Cart.destroy({
                    where: {
                        ProductId : req.params.productId,
                        UserId: req.user.id
                    }
                })
                return res.status(200).json({message: 'Product deleted from your cart'})
            }
        } catch (err) {
            return next(err)
        }
    }
}

module.exports = CartController