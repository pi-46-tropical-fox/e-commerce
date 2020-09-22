const {Cart, CartProduct, Category, Product, User, Whistlist} = require('../models')

class PaymentController {
    static async pay(req, res, next){
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
                    let product = await Product.findByPk(el.ProductId)
                    let decrement = await product.decrement('stock', {by: el.qty})
                    let cart = await Cart.destroy({
                        where: {
                            ProductId : el.ProductId
                        }
                    })
                    console.log(product.name, product.stock, '<<<< updated stock')
                }
                return res.status(200).json({grandTotal, message: 'Payment success'})
            }
        } catch (err) {
            return next(err)
        }
    }
}

module.exports = PaymentController