const {Cart, Product, Profile, Transaction} = require('../models')

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
            if(carts.length < 1){
                throw {name: 'EmptyCart'}
            }else{
                const profile = await Profile.findOne({
                    where: {
                        UserId: req.user.id
                    }
                })
                console.log(profile);
                if(!profile){
                    throw {name: 'InvalidProfile'}
                }else{
                    let qtyLimit
                    let outOfStockProduct = []
                    for(const el of carts){
                        let product = await Product.findByPk(el.ProductId)
                        if(product.stock < el.qty){
                            qtyLimit = true
                            outOfStockProduct.push(`${product.name} ${product.color} ${product.capacity}`)
                        }
                    }
                    if(qtyLimit){
                        throw {name: 'OutOfStockProduct', message: `Out of stock product (${outOfStockProduct.join(', ')})`}
                    }else{
                        let grandTotal = {
                            qty: 0,
                            price: 0
                        }
                        let detailProduct = []
                        for(const el of carts){
                            grandTotal.qty += el.qty
                            grandTotal.price += (el.qty * el.Product.price)
                            detailProduct.push(`${el.Product.name} ${el.Product.color} ${el.Product.capacity} Qty: ${el.qty}`)
                            let product = await Product.findByPk(el.ProductId)
                            let decrement = await product.decrement('stock', {by: el.qty})
                            let cart = await Cart.destroy({
                                where: {
                                    ProductId : el.ProductId,
                                    UserId: req.user.id
                                }
                            })
                            console.log(product.name, product.stock, '<<<< updated stock')
                        }
                        let obj = {
                            description: detailProduct.join(', '),
                            shippingAddress: profile.address,
                            status: 'PAID',
                            total: grandTotal.price,
                            UserId: req.user.id
                        }
                        const transaction = await Transaction.create(obj)
                        return res.status(201).json({transaction, grandTotal, message: 'Payment success'})
                    }
                }
            }
        } catch (err) {
            return next(err)
        }
    }
}

module.exports = CheckoutController