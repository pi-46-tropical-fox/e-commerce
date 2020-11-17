const {Cart, User, Product} = require('../models')

class CartController {

    static async getCarts(req,res,next) {
       try {
            const carts = await Cart.findAll({where: {
                UserId: req.userData.id,
                status: 'waiting payment'}})
            console.log(carts);
            for (let i = 0 ; i < carts.length ; i++) {
                const product = await Product.findByPk(carts[i].ProductId)
                carts[i].dataValues['Product'] = product
            }
            return res.status(200).json(carts)
       }
       catch(err) {
            return next(err)
        }
    }
    
    static async getCart(req,res,next) {
        try {
            const cart = await Cart.findByPk(req.params.id)
            return res.status(200).json(cart)
        }
        catch(err) {
             return next(err)
         }
     }

    static async postCart(req,res,next) {
        try {
            const foundProduct = await Product.findByPk(req.params.id)
            if(foundProduct.quantity <= 0) {
                throw {statusCode: 400, msg: "out of stock!"}
            }
            const foundCart = await Cart.findOne({where: {
                ProductId: +req.params.id,
                UserId: req.userData.id
            }})
            if (foundCart) {
                foundCart.quantity++
                foundProduct.stock--
                const _ = await Product.update({stock: foundProduct.stock}, { where: {id: req.params.id}})
                const result = await Cart.update({quantity: foundCart.quantity}, { where: {id: foundCart.id}})
                return res.status(200).json({message: "Success"})
            } else {
                const cart = {
                    ProductId : +req.params.id,
                    UserId : req.userData.id,
                    quantity: 1,
                    status: 'waiting payment'
                }
                foundProduct.stock--
                const _ = await Product.update({stock: foundProduct.stock}, { where: {id: req.params.id}})
                const result = await Cart.create(cart)
                return res.status(201).json(result)
            }
        }
        catch(err) {
            return next(err)
        }
    }
    
    static async addCart(req,res,next) {
        try {
            const foundCart = await Cart.findByPk(req.params.id)
            const foundProduct = await Product.findByPk(foundCart.ProductId)
            if(foundProduct.stock <= 0) {
                throw {statusCode: 400, msg: "out of stock!"}
            }
            foundCart.quantity++
            foundProduct.stock--
            const product = await Product.update({stock: foundProduct.stock}, { where: {id: foundCart.ProductId}})
            const result = await Cart.update({quantity: foundCart.quantity}, { where: {id: foundCart.id}})
            return res.status(200).json({message: "Success"})
        }
        catch(err) {
            return next(err)
        }
    }
        
    static async minCart(req,res,next) {
        try {
            const foundCart = await Cart.findByPk(req.params.id)
            const foundProduct = await Product.findByPk(foundCart.ProductId)
            if(foundCart.quantity <= 0) {
                throw {statusCode: 400, msg: "Add to chart first!"}
            }
            foundCart.quantity--
            foundProduct.stock++
            const product = await Product.update({stock: foundProduct.stock}, { where: {id: foundCart.ProductId}})
            const result = await Cart.update({quantity: foundCart.quantity}, { where: {id: foundCart.id}})
            return res.status(200).json({message: "Success"})
        }
        catch(err) {
            return next(err)
        }
    }

    static async deleteCart(req,res,next) {
        try {
            const foundCart = await Cart.findByPk(req.params.id)
            const foundProduct = await Product.findByPk(foundCart.ProductId)
            console.log(foundProduct.stock,'sebelum');
            foundProduct.stock += foundCart.quantity
            console.log(foundProduct.stock,'sesudah');
            const result = await Cart.destroy({
                where: {id : req.params.id},
            })
            return res.status(200).json({message: "Success"})
        } catch(err) {
            return next(err)
        }
    }
}

module.exports = CartController