const { Cart, Product } = require('../models')

class CartController{
    static getCartItems(req, res, next){
        Cart.findAll({
            where : {
                UserId : req.userData.id,
                status : 'unpaid'
            },
            include : Product 
        }).then(data => {
            res.status(200).json(data)
        }).catch(e => next(e))
    }

    static checkout(req, res, next){
        Cart.findAll({
            where : {
                UserId  : req.userData.id,
                status : 'unpaid'
            }
        }).then(cartItems => {
            cartItems.forEach(cartItem => {
                Product.decrement({ stock : cartItem.quantity }, { where : { id : cartItem.ProductId }})
            })

            Cart.update({ status : 'paid' }, {
                where : {
                    UserId  : req.userData.id,
                    status : 'unpaid'
                }
            }).then(() => {
                res.send(200).json({ message : 'Checkout Done!' })
            })

        }).catch(e => {
            next(e)
        })
    }

    static addItem(req, res, next){
        const UserId = req.userData.id
        const ProductId = req.body.productId
        const quantity = req.body.quantity || 1

        Cart.findOne({ where : { UserId, ProductId, status : 'unpaid' }}).then(findCart => {
            if(findCart){
                throw { message : 'Cart item already existed!', statusCode : 400 }
            } else {
                return Product.findOne({ where : { id : ProductId }}).then(product => {
                    if(quantity > product.stock){
                        throw { message : 'Quantity is more than stock!', statusCode : 400 }
                    }

                    return Cart.create({ UserId, ProductId, quantity , status : 'unpaid' }).then(data => {
                        Cart.findOne({ where : { id : data.id }, include : Product }).then(dataCreated => {
                            res.status(201).json(dataCreated)
                        })
                    })
                })
            }
        }).catch(err => next(err))
    }

    static updateQuantity(req, res, next){
        const { id } = req.params
        const { quantity } = req.body

        Cart.findOne({ where : { id }, include : Product }).then(cartItem => {
            if(cartItem){
                if(quantity > cartItem.Product.stock){
                    throw { message : 'Quantity is more than stock!', statusCode : 400 }
                }

                return Cart.update({ quantity }, { where : { id }}).then(updated => {
                    res.status(200).json({ message : 'updated' })
                })

            } else {
                throw { message : 'Cart item not found ', statusCode : 404}
            }
        }).catch(e => next(e))
    }

    static deleteItem(req, res, next){
        const { id } = req.params

        Cart.destroy({ where : { id }}).then(() => {
            res.status(200).json({ message : 'Data deleted' })
        }).catch(e => {
            next(e)
        })
    }
}

module.exports = CartController
