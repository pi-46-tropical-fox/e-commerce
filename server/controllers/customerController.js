const { User, Product, Wishlist, Cart } = require('../models')
const bcryptjs = require('bcryptjs')
const {generateToken} = require('../helpers/jwt')

class CustomerController {

    static login (req, res, next) {
        const { email, password } = req.body
        User.findOne({where: {email}})
        .then(user => {
            // console.log(user, 'ini user')
            if(!user) {
                throw ({message: 'invalid email/password', statusCode:400})
                // throw {message: 'invalid email/password', statusCode: 400}
            }
            return user
        })
        .then(user => {
            const isValid = bcryptjs.compareSync(password, user.password)
                if (isValid) {
                    //generate jwt
                    const access_token = generateToken(user)
                    return res.status(200).json({ access_token })
                }
                else {
                    return res.status(400).json({message: 'invalid email/password'})
                    // throw {message:'invalid email/password', statusCode:400 }
                }
        })
        .catch(err => {
            // console.log(err)
             return next(err)
            // return res.status(400).json({message: 'invalid email/password'})
            // throw{message: 'Invalid email/password', statusCode: 400}
        })
    }

    static register (req, res, next) {
        let params = {
            email: req.body.email,
            password: req.body.password,
            role: 'user'
        }
        User.create(params)
        .then(user => {
            const {id, email, role} = user
            res.status(201).json({ email, role })
        })
        .catch(err => {throw err})
    }

    static showProducts (req, res, next) {
        Product.findAll()
        .then(data => {
            return res.status(200).json(data)
        })
        .catch(err => {
            return res.status(401).json(err)
        })
    }

    static addToWishlist (req, res, next) {
        let params = {
            UserId: req.userData.id,
            ProductId: req.params.productId
        }
        Wishlist.findAll({where: {UserId:params.UserId, ProductId: params.ProductId}})
        .then(data => {
            if (data.length >= 1) {
                Wishlist.destroy({where: {UserId:params.UserId, ProductId: params.ProductId}})
                .then(deleted => {
                    res.status(200).json({message: 'Removed from wishlist'})
                })
                .catch(err => {
                    next(err)
                })
            } else {
                Wishlist.create(params)
                .then(created => {
                    res.status(200).json({message: 'Successfully added to wishlist'})
                })
                .catch(err => {
                    next(err)
                })
            }
        })
        .catch(err => {
            next(err)
        })
    }

    static addToCart (req, res, next) {
        let params = {
            UserId: req.userData.id,
            ProductId:req.body.ProductId,
            quantity: Number(req.body.quantity),
            status: 'cart'
        }
        let isCreated = false
        console.log(params.UserId, 'ini UserId')
        console.log(params.ProductId, 'ini ini ProductId')
        Cart.findOrCreate({
            where: {ProductId: params.ProductId, UserId: params.UserId, status: 'cart'}, 
            defaults: {
                UserId: params.UserId,
                ProductId: params.ProductId,
                quantity: params.quantity,
                status: params.status
            }
        })
        .then(function(created) {
            console.log(created[1], 'ini created')
            if(created[1]) {
                isCreated = true
                // res.status(201).json(created)
                return created
            } else {
                let newQuantity = {quantity: created[0].quantity + Number(req.body.quantity)}
                console.log(newQuantity, 'ini newQuantity')
                return Cart.update(newQuantity, {where: {
                    UserId:params.UserId,
                    ProductId: params.ProductId},
                returning: true})
            }
        })
        .then(created => {
            if(isCreated) {
                // console.log(created, 'ini created')
                res.status(201).json(created[0])
            } else {
                // console.log(created, 'ini created')
                res.status(200).json(created[1][0])
            }
        })
        .catch(err => {
            next(err)
        })
    }

    static getCart (req, res, next) {
        Cart.findAll({where:{UserId:req.userData.id, status: 'cart'},
                      attributes: ['id', 'UserId', 'ProductId', 'quantity'],
                      include: {model: Product}})
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            return next(err)
        })
    }

    static getWishlist (req, res, next) {
        Wishlist.findAll({
            where: {UserId : req.userData.id},
            attributes: ['id', 'UserId', 'ProductId'],
            include: {model: Product}})
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            next(err)
        })
    }

    static getOneCart (req, res, next) {
        Cart.findOne({where: {id: req.params.cartId}})
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            next(err)
        })
    }

    static updateCart (req, res, next) {
        let params = {quantity: req.body.quantity}
        Cart.update(params, {where: {id: req.body.CartId}})
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            next(err)
        })
    }

    static deleteWishlist (req, res, next) {
        Wishlist.destroy({where: {id: req.params.wlId}})
        .then(data => {
            res.status(200).json({message: 'Wishlist successfully deleted'})
        })
        .catch(err => {
            next(err)
        })
    }

    static deleteCart (req, res, next) {
        Cart.destroy({where: {id: req.params.cartId}})
        .then(data => {
            res.status(200).json({message: 'Cart item successfully deleted'})
        })
        .catch(err => {
            next(err)
        })
    }

    static checkout (req, res, next) {
        console.log('start req.body',req.body, 'end req.body')
        let data = req.body.carts
        data.forEach(datum => {
            let quantity = datum.Product.stock - datum.quantity
            let params = {stock: quantity, status: req.body.status}
            Product.update(params, {where: {id:datum.ProductId}})
            .then(data => {
                Cart.update(params, {where: {id:datum.id}})
                .then(data => {
                    res.status(200).json({message: 'Checkout Successful'})
                })
                .catch(err => {
                    next(err)
                })
            })
            .catch(err => {
                console.log(err)
                next(err)
            })
        })
    }
}

module.exports = CustomerController