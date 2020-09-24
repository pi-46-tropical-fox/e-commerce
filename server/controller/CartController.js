const { Cart, User, Product } = require('../models') 
const {Op} = require('sequelize')

class CartController {

    static createOrUpdate (req, res) {
        let activity;
        const params = {
            UserId: req.userData.id,
            ProductId: req.params.id
        }
        Cart.findOne({
            where: {
                UserId: req.userData.id,
                ProductId: req.params.id
            }
        })
        .then(data => {
            if(data) {
                activity = 'update'
                const { id } = data;
                return Cart.increment('quantity', {where: {id}})
            } else {
                activity = 'create'
                return Cart.create(params)
            }
        })
        // .then(data => {
        //     return Product.decrement('stock', {where: {id: req.params.id}})
        // })
        .then(data => {
            res.status(200).json({data, message: 'Successfully added item to cart'})
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({message: 'Internal Server Error'})
        })
    }

    static removeOne (req, res) {
        Cart.decrement('quantity', { where: {
            UserId: req.userData.id,
            ProductId: req.params.id
        }})
        // .then(data => {
        //     return Product.increment('stock', {where: {id: req.params.id}})
        // })
        .then(data => {
            res.status(200).json({data, message: 'Successfully removed item from cart by one'})
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({message: 'Internal Server Error'})
        })
    }

    static get (req, res) {
        Cart.findAll({
            where:{
                UserId: req.userData.id,
                quantity: {
                    [Op.gt]: 0
                }
            },
            include: Product
        })
        .then(data => {
            res.status(200).json({ data })
        })
        .catch(err => {
            res.send(err)
        })
    }
    static delete (req, res) {
        const {id} = req.params
        Cart.destroy({where:{id}})
        .then(data => {
            res.status(200).json({data, message: 'Successfully deleted item from cart'})
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({message: 'Internal Server Error'})
        })

    }

    static checkout (req, res) {
        const promises  = req.body.map(cart => {
            const productId = cart.ProductId
            const quantity = cart.quantity
            return Product.decrement('stock', {by: quantity, where :{id : productId}})
        });
        Promise.all(promises)
        .then(data => {
            const destroyCarts = req.body.map(cart => {
                return Cart.destroy({where:{id: cart.id}})
            })
            Promise.all(destroyCarts)
        })
        .then(data => {
            console.log('berhasil')
            res.status(200).json({data, message: 'Successfully checked out your cart'})
        })
        .catch(err => {
            console.log('gagal')
            const cancelPromises  = req.body.map(cart => {
                const productId = cart.ProductId
                const quantity = cart.quantity
                return Product.increment('stock', {by: quantity, where :{id : productId}})
            });
            Promise.all(cancelPromises)
            .then(data => {
                console.log('berhasil revert')
                res.status(200).json({data, message: 'Successfully checked out yuor cart'})
            })
            .catch(err => {
                console.log(err)
                res.status(500).json({message: 'Internal Server Error'})
            })
        })



    }
}

module.exports = CartController