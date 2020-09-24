const {Cart, Product} = require("../models")

class CartController {
    static add (req,res) {
        let price = 0
        let quantity = 1
        Cart.findOne({
            where:{
                ProductId: req.params.ProductId,
                UserId: req.userData.id
            }
        })
        .then(data => {
            // console.log(data)
            quantity += data.qty
            return Cart.update({
                qty: quantity,
                price: data.price*quantity,
            },{
                where: {ProductId: req.params.ProductId}
            })
        })
        .then(update => {
            console.log(update)
            if(update[0] !== 0) {
                return res.status(200).json({message: 'Cart Added'})
            }
        })
        .catch(err => {
            // console.log(err, '<<<< err catch')
            Product.findByPk(req.params.ProductId)
            .then(product => {
                price = product.price
                let payload = {
                    qty: 1,
                    price: product.price,
                    UserId: req.userData.id,
                    ProductId: req.params.ProductId,
                    createdAt: new Date,
                    updatedAt: new Date
                }
                return Cart.create(payload)
            })
            .then(cart =>{
                return res.status(201).json(cart)
            })
            .catch(err => {
                return res.status(500).json({message: 'internal server error'})
            })
        })
    }

    static show (req,res) {
        Cart.findAll({
            where: {
                UserId: req.userData.id
            },
            include: [Product]
        })
        .then(cart => {
            return res.status(200).json(cart)
        })
        .catch(err => {
            console.log(err)
            return res.status(500).json({message: 'internal server error'})
        })
    }
    static delete (req,res) {
        Cart.destroy({where:{id: req.params.id}})
        .then(() => {
            return res.status(200).json({message: 'delete success'})
        })
        .catch(err => {
            console.log(err)
            return res.status(500).json({message: 'internal server error'})
        })
    }
    static update (req,res) {
        Cart.findByPk(req.params.id)
        .then(data => {
            let hargaSatuan = data.price/data.qty
            if(req.headers.add){
                return Cart.update({
                    qty: data.qty+1,
                    price: data.price+hargaSatuan
                },{where:{id: req.params.id}})
            }else{
                return Cart.update({
                    qty: data.qty-1,
                    price: data.price-hargaSatuan
                },{where:{id: req.params.id}})
            }
        })
        .then(() => {
            return res.status(200).json({message: 'update success'})
        })
        .catch(err => {
            console.log(err)
            return res.status(500).json({message: 'internal server error'})
        })
    }
    static checkout (req,res) {
        console.log(req.body)
        Cart.destroy({
            where: {
                UserId: req.userData.id
            }
        })
        .then(() => {
            let data = req.body
            return Product.decrement({stock: data.qty}, {where:{id: data.ProductId}})
        })
        .then(data => {
            res.status(200).json({message: 'checkout success'})
        })
        .catch(err => {
            console.log(err)
            return res.status(500).json({message: 'internal server error'})
        })
    }
}

module.exports = CartController