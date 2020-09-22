const {Cart, Product} = require('../models')

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
                throw {name: 'EmptyCart'}
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
                status: 'active',
                UserId: req.user.id,
                ProductId: req.params.productId
            }
            const product = await Cart.findOne({
                include: [{
                    model: Product
                }],
                where: {
                    ProductId: +req.params.productId
                }
            })
            if(product){
                if(product.qty < product.Product.stock){
                    const increment = await product.increment('qty', {by: 1})
                    return res.status(200).json({product, message: 'Product successfully updated to my cart'})
                }else{
                    throw {name: 'QtyIsLimit'}
                }
            }else{
                const cart = await Cart.create(obj)
                return res.status(201).json({cart, message: 'Product successfully added to my cart'})
            }
        } catch (err) {
            return next(err)
        }
    }
    static async deleteProductFromMyCart(req, res, next){
        try {
            const cart = await Cart.destroy({
                where: {
                    ProductId : +req.params.productId
                }
            })
            return res.status(200).json({message: 'Product has been deleted from cart'})
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
                    ProductId: +req.params.productId
                }
            })
            if(product.qty >= 2){
                const decrement = await product.decrement('qty', {by: 1})
                return res.status(200).json({product, message: 'Product qty successfully updated from my cart'})
            }else{
                const cart = await Cart.destroy({
                    where: {
                        ProductId : +req.params.productId
                    }
                })
                return res.status(200).json({message: 'Product has been deleted from my cart'})
            }
        } catch (err) {
            return next(err)
        }
    }
}

module.exports = CartController