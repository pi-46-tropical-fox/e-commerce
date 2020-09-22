const { Cart, Product } = require('../models')

class CartController {
    static addCart (req, res, next) {
        let cartObj = {
            quantity: req.body.quantity,
            status: req.body.status,
            ProductId: req.params.productId,
            //TOBE UPDATED BY REQ USER DATA
            UserId: req.userData.id
        }

        Cart.create(cartObj)
            .then(data => {
                return res.status(201).json(data)
            })
            .catch(err => {
                console.log(err)
                return next(err)
            })
    }

    static getCarts (req, res, next) {
        Cart.findAll({
            include: [Product]
        })
            .then(data => {
                return res.status(200).json(data)
            })
            .catch(err => {
                console.log(err)
                return next(err)
            })
    }

    static deleteCart (req, res, next) {
        Cart.destroy({
            where: {
                Id: req.params.id
            }
        })
            .then(data => {
                return res.status(200).json({message: "Successfully delete cart product"})
            })
            .catch(err => {
                return next(err)
            })
    }
}

module.exports = CartController