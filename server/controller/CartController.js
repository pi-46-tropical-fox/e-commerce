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

    static addItem(req, res, next){
        const UserId = req.userData.id
        const ProductId = req.body.productId

        Cart.findOne({ UserId, ProductId }).then(findCart => {
            if(findCart){
                res.status(400).json({ message : 'Cart item already existed!' })
            }
        })

        Cart.create({ UserId, ProductId, stock : 1, status : 'unpaid' }).then(data => {
            res.status(200).json(data)
        }).then(err => next(err))
    }

    static updateQuantity(req, res, next){
        
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
