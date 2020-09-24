const { Cart, Product } = require('../models')

class CartController {
    static async showCart(req, res) {
        try {
            let arr = []
            const { id } = req.userData
            const carts = await Cart.findAll({where: {userId: id, status: false}, order: ['id']})
            const products = await Product.findAll()
            for (let i=0;i<carts.length;i++) {
                for (let j=0;j<products.length; j++) {
                    if (carts[i].productId == products[j].id && products[j].stock>=carts[i].quantity) {
                        arr.push({
                            id: carts[i].id,
                            productId: carts[i].productId,
                            userId: carts[i].userId,
                            quantity: carts[i].quantity,
                            status: carts[i].status,
                            product: {
                                id: products[j].id,
                                name: products[j].name,
                                image_url: products[j].image_url,
                                price: products[j].price,
                                stock: products[j].stock
                            }
                        })
                    }
                }
            }
            return res.status(200).json(arr)
        }
        catch(err) {
            console.log(err, '<<<< Error di Show Cart');
            return res.status(500).json({message: "Internal Server Error"})
        }
    }
    static async addCart(req, res) {
        try {
            const { productId } = req.params
            const { id } = req.userData
            const cart = await Cart.findOne({where: { productId: Number(productId), userId: id, status: false}})
            const product = await Product.findOne({where: {id: productId}})
            if(cart !=null && cart.productId == Number(productId) && cart.quantity<product.stock) {
                await Cart.update({quantity: cart.quantity+1}, {where: {userId: id, productId}})
                return res.status(201).json({message: 'Successfully Adding Product to Cart'})
            } else if(cart != null && (cart.quantity == product.stock || cart.quantity >= product.stock)) {
                return res.status(201).json({message: `Can't Add Cart Because the Quantiry is Larger than Stock`}) 
            } else {
                await Cart.create({productId, userId: id, quantity: 1, status: false})
                return res.status(201).json({message: 'Successfully Adding Product to Cart'})
            }
        }
        catch(err) {
            console.log(err, '<<<< Error di Add Cart');
            return res.status(500).json({message: "Internal Server Error"})
        }
    }
    static async checkout(req, res) {
        try {
            const { cartsId } = req.body
            for (let i=0;i<cartsId.length;i++) {
                const cart = await Cart.findOne({where: {id: cartsId[i]}})
                const product = await Product.findOne({where: {id: cart.productId}})
                await Cart.update({status: true}, {where: {id: cartsId[i]}})
                await Product.update({stock: product.stock-cart.quantity, updatedAt: new Date()}, {where: {id: cart.productId}})
            }
            return res.status(200).json({message: 'Successfully to Checkout'})
        }
        catch(err) {
            console.log(err, '<<<< Error di Checkout');
            return res.status(500).json({message: "Internal Server Error"})
        }
    }
    static async deleteCart(req, res) {
        try {
            const { id } = req.params
            await Cart.destroy({where: {id}})
            return res.status(200).json({message: 'Successfully Deleted Cart'})
        }
        catch(err) {
            console.log(err, '<<<< Error di Delete Cart');
            return res.status(500).json({message: "Internal Server Error"})
        }
    }
}
 
module.exports = CartController