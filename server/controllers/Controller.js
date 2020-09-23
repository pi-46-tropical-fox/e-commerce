const { User, Product, Cart } = require('../models');

class Controller {
    static getProducts(req, res) {
        Product.findAll()
            .then(result => {
                res.status(200).json(result)
            })
    }
    static createProduct(req, res) {
        const params = {
            name: req.body.name,
            image_url: req.body.image_url,
            price: req.body.price,
            stock: req.body.stock
        }
        console.log(params);
        Product.create(params)
            .then(result => {
                console.log(result);
                res.status(200).json({ msg: 'success adding product', id: result.id })
            })
            .catch(err => {
                console.log(err);
                res.status(401).json({ msg: 'failed to add product' })
            })
    }
    static getProductById(req, res) {
        Product.findByPk(req.params.id)
            .then(result => {
                console.log(result);
                res.status(200).json(result)
            })
            .catch(err => {
                console.log(err);
                res.status(400).json({ msg: 'failed to get product by id' })
            })
    }
    static editProduct(req, res) {
        const params = {
            name: req.body.name,
            image_url: req.body.image_url,
            price: req.body.price,
            stock: req.body.stock
        }
        Product.update(params, { where: { id: req.params.id } })
            .then(result => {
                console.log(result);
                res.status(201).json(result)
            })
            .catch(err => {
                console.log(err);
                res.status(401).json({ msg: 'failed to update product' })
            })

    }
    static deleteProduct(req, res) {
        Product.destroy({ where: { id: req.params.id } })
            .then(result => {
                console.log(result);
                res.status(200).json({ msg: 'success deleting product' })
            })
            .catch(err => {
                console.log(err);
                res.status(400).json({ msg: 'failed to delete data' })
            })
    }
    static addToCart(req, res) {
        let params = {
            ProductId: req.params.productID,
            UserId: req.UserData.id,
            quantity: 1
        }
        Product.findByPk(req.params.productID) // Check if product exists in DB
            .then(result => {
                if (!result) {
                    console.log('product not found');
                    res.status(400).json({ msg: 'Product not found' })
                } else if (result.stock < 1) { // Check if product stock is 0
                    console.log('insufficient stock');
                    res.status(400).json({ msg: 'Insufficient stock' })
                } else {
                    console.log('check if product exists in cart');
                    return Cart.findOne( // check if product already exists in user cart
                        {
                            where:
                            {
                                ProductId: req.params.productID,
                                UserId: req.UserData.id
                            }
                        }
                    )
                }
            })
            .then(result => {
                if (!result) {
                    return Cart.create(params) // create product in Cart
                } else {
                    return Cart.increment('quantity', { where: { ProductId: req.params.productID, UserId: req.UserData.id } })
                }
            })
            .then(result => {
                return Product.decrement('stock', { where: { id: req.params.productID } })
            })
            .then(result => {
                res.status(201).json({ msg: 'success add to cart' })
            })
            .catch(err => {
                console.log(err);
                res.status(400).json({ msg: 'failed add to cart' })
            })
    }
    static editCartQty(req, res) {
        let operator = req.params.operator
        Cart.decrement({ 'quantity': operator }, { where: { id: req.params.id, UserId: req.UserData.id }, returning: true })
            .then(result => {
                console.log(result[0][0][0], 'edit cart');
                return Product.increment({ 'stock': operator }, { where: { id: result[0][0][0].ProductId } })
            })
            .then(result => {
                res.status(201).json({ msg: 'edit cart qty success' })
            })
            .catch(err => {
                console.log(err);
                res.status(401).json({ msg: 'edit cart qty failed' })
            })
    }
    static deleteCartItem(req, res) {
        let productID = req.params.productID
        let quantity = req.params.qty
        Product.increment(
            { 'stock': quantity },
            {
                where:
                {
                    id: productID,
                    UserId: req.UserData.id
                }
            }
        )
            .then(result => {
                console.log(result, 'reset stock of product from cart');
                return Cart.destroy({ where: { id: req.params.id } })
            })
            .then(result => {
                console.log(result, 'deleted item from cart');
                res.status(201).json({ msg: 'success delete item from cart' })
            })
            .catch(err => {
                console.log(err);
                res.status(400).json({ msg: 'failed to delete item from cart' })
            })
    }
    static getCart(req, res) {
        Cart.findAll({ where: { UserId: req.UserData.id } })
            .then(result => {
                res.status(200).json(result)
            })
            .catch(err => {
                console.log(err);
                res.status(400).json({ msg: 'error getting cart' })
            })
    }
}

module.exports = Controller