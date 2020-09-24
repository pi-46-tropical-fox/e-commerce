const { Cart, User, Product } = require('../models')  

class CartController {
    static addCart(req,res,next){
        
        const { id, quantity } = req.body;
        let finalQty;
        Product.findOne({ where: { id } })
        .then((product) => {
            if (!product) {
                res.status(404).json({ message: 'DATA NOT FOUND' })
            } else if (quantity > product.stock) {
                res.status(400).json({ message: 'OUT OF STOCK' })
            } else {
                let barang = product
                let totalPrice = product.price * quantity;
                Cart.findOne({
                    where: {
                        UserId: req.userData.id,
                        ProductId: product.id,
                    },
                })
                .then((data) => {
                    if (data) {
                        finalQty = data.quantity + quantity;
                        if (finalQty > barang.stock) {
                            res.status(400).json({ message: 'INSUFFICIENT STOCK' })
                        } else {
                            Cart.update({
                                totalPrice: totalPrice,
                                quantity: finalQty,
                            },
                            {
                                where: {
                                    UserId: req.userData.id,
                                    ProductId: product.id,
                                },
                            })
                            .then((data) => {
                                res.status(200).json({
                                    cart: data,
                                    product: product,
                                });
                            });
                        }
                    } else {
                        return Cart.create({
                            UserId: req.userData.id,
                            ProductId: product.id,
                            quantity: quantity,
                            totalPrice: totalPrice,
                        })
                        .then((data) => {
                            res.status(201).json({
                                cart: data,
                                product: product,
                            });
                        });
                    }
                })
                .catch((err) => {
                    console.log(err);
                    res.status(500).json({ message: 'Internal Server Error' })
                });
            }
        })
        .catch((err) => {
            next(err)
        })

    }

    static myCart(req, res,next){
        
        Cart.findAll({
            where: {
                UserId: req.userData.id,
            },
            include: [ Product, User ],
            order: [['id', 'ASC']]
        })
        .then(data => {
            res.status(200).json({ cart: data })
        })
        .catch( err => {
            next(err)
        })
    }

    static updateCart(req,res,next){
        let { productId, quantity } = req.body;

        Product.findOne({
          where: {
            id: productId,
          },
        })
        .then((product) => {
            let totalPrice = product.price * quantity;
            Cart.update({
                quantity: quantity,
                totalPrice: totalPrice
            },
            {
                where: {
                    UserId: req.userData.id,
                    ProductId: productId,
                }
            })
            .then((response) => {
                if (response[0] > 0) {
                    res.status(200).json({ 
                        message: 'Succesfully update cart for selected product' 
                    });
                }
            })
        })
        .catch((err) => {
            next(err)
        })

    }

    static deleteCart(req, res,next){
        const { productId } = req.body
        Cart.destroy({
            where: {
                UserId: req.userData.id,
                ProductId: productId,
            }
        })
        .then( response => {
            if (response > 0){
                res.status(200).json({ message: 'Sucessfully delete cart for selected product' })
            }
        })
        .catch( (err) => {
            next(err)
        })

    }

}

module.exports = CartController