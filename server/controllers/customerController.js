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
            UserId: req.headers.UserId,
            ProductId: req.params.productId
        }
        Wishlist.create(params)
        .then(data => {
            res.status(201).json(data)
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
                res.status(201).json(created[0])
            } else {
                res.status(200).json(created[1][0])
            }
        })
        .catch(err => {
            next(err)
        })
    }

    static getCart (req, res, next) {
        Cart.findAll({where:{UserId:req.userData.id, status: 'cart'},
                      include: {model: Product}})
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            return next(err)
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
        Cart.update(params, {where: {ProductId: req.params.productId}})
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
    }
}

module.exports = CustomerController