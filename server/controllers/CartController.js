const {Product, Cart} = require('../models');

class CartController {

    static async getPaid(req,res,next) {
        try {
            let data = await Cart.findAll({
                where: {status:'paid', UserId: req.userData.id},
                include: [{
                    model: Product
                }]
            })
            res.status(200).json(data)
        } catch (err) {
            next(err)
        }
    }

    static async getUnPaid(req,res,next) {
        
        try {
            let data = await Cart.findAll({
                where: {status: 'unpaid', UserId: req.userData.id},
                attributes: ['id','UserId', 'ProductId', 'quantity', 'status'],
                include: [{
                    model:Product
                }]
            })
            res.status(200).json(data)
        } catch (err) {
            next(err)
        }
    }

    static async addCart(req,res,next) {
        const {ProductId, status, quantity} = req.body
        const UserId = req.userData.id

        try {
            const data = await Cart.create({
                UserId,ProductId,status,quantity
            })
            res.status(200).json(data)
        } catch (err) {
            next(err)
        }
    }

    static async updateCart(req,res,next) {
        const {ProductId, status, quantity} = req.body
        const UserId = req.userData

        if(typeof UserId == 'undefined' || typeof ProductId == 'undefined' || typeof status == 'undefined' || typeof quantity == 'undefined') {
            next({name: 'Data Invalid'})
        }

        try {
            let data = await Cart.update ({UserId,ProductId,status, quantitiy}, {where: {id: req.params.id}})
            if(data[0]) {
                res.status(200).json({data})
            } else {
                next({name: 'SequelizeValidationError'})
            }
        } catch (err) {
            next(err)
        }
    }

    static async deleteCart(req,res,next) {
        try {
            const data = await Cart.destroy({
                where: {id: req.params.id}
            })
            res.status(200).json({data})
        } catch (err) {
            next(err)
        }
    }
}

module.exports = CartController