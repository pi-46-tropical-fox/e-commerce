const {Product, User} = require('../models')

class ProductController {
    static addProduct(req, res, next) {
        let productObj = {
            name: req.body.name,
            image_url: req.body.image_url,
            price: req.body.price,
            stock: req.body.stock
        }

        Product.create(productObj)
        .then(product => {
            return res.status(201).json(product)
        })
        .catch(err => {
            next(err)
        })
    }

    static getAllProduct(req, res, next) {
        Product.findAll()
        .then(product => {
            return res.status(200).json(product)
        })
        .catch(err => {
            next(err)
        })
    }

    static detailProduct(req, res, next) {
        Product.findByPk(req.params.id)
        .then(product => {
            return res.status(200).json(product)
        })
        .catch(err => {
            next(err)
        })
    }

    static updateProduct(req, res, next) {
        let productObj = {
            name: req.body.name,
            image_url: req.body.image_url,
            price: req.body.price,
            stock: req.body.stock
        }

        Product.update(productObj, {
            where: {
                id: req.params.id
            }
        })
        .then(product => {
            return res.status(200).json(product)
        })
        .catch(err => {
            next(err)
        })
    }

    static deleteProduct(req, res, next) {
        let productDelete = {}

        Product.findByPk(req.params.id)
        .then(data => {
            productDelete = data
            return data.destroy()
        })
        .then(data => {
            return res.status(200).json(productDelete)
        })
        .catch(err => {
            next(err)
        })
    }
}

module.exports = ProductController