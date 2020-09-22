const {Cart, CartProduct, Category, Product, User, Whistlist} = require('../models')

class CheckoutController {
    static async checkoutProduct(req, res, next){
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
}

module.exports = CheckoutController