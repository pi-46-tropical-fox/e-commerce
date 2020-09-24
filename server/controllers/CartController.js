const { Cart, User, Product } = require('../models')

class CartController {
    static listCart(req, res, next) {
        User.findByPk(req.userData.id, {include: Product})
        .then(result => {
            return res.status(200).json(result.Products)
        })
        .catch(err => {
            next(err)
        })
    }

    static addToCart(req, res, next) {
        let price = 0
        let amount = 1
        Cart.findOne({
            where:{
                ProductId: req.params.ProductId,
                UserId: req.userData.id
            }
        })
        .then(data => {
            console.log(data)
            amount += data.amount
            return Cart.update({
                amount: amount,
                price: data.price*amount,
            },{
                where: {ProductId: req.params.ProductId}
            })
        })
        .then(update => {
            console.log(update)
            if(update[0] !== 0) {
                return res.status(200).json({message: 'Cart Added'})
            }
        })
        .catch(err => {
            // console.log(err, '<<<< err catch')
            Product.findByPk(req.params.ProductId)
            .then(product => {
                price = product.price
                let payload = {
                    amount: 1,
                    price: product.price,
                    UserId: req.userData.id,
                    ProductId: req.params.ProductId,
                    createdAt: new Date,
                    updatedAt: new Date
                }
                return Cart.create(payload)
            })
            .then(cart =>{
                return res.status(201).json(cart)
            })
            .catch(err => {
                return res.status(500).json({message: 'Internal server error'})
            })
        })
    }

    static editAmount(req, res, next) {
        let cartData = {
            where: {
                UserId: req.userData.id,
                ProductId: req.params.id
            }
        }

        let updateAmount = {
            amount: req.body.amount
        }

        Cart.update(updateAmount, cartData)
        .then(result => {
            return res.status(200).json(result)
        })
        .catch(err => {
            next(err)
        })
    }

    static delete(req, res, next) {
        let findCart = {
            where: {
                UserId: req.userData.id,
                ProductId: req.params.id
            }
        }

        Cart.destroy(findCart)
        .then(result => {
            return res.status(200).json({message: 'Successfully delete cart'})
        })
        .catch(err => {
            next(err)
        })
    }
}

module.exports = CartController