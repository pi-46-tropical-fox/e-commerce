const {Cart, Purchase, Product} = require('../models')

class PurchaseController {
    static getList (req, res, next) {
        Purchase.findAll({where:{UserId:req.userData.id},include:Product})
        .then(data=>{
            res.status(200).json(data)
        })
        .catch(err=>{
            next(err)
        })
    }

    static addPurchase (req, res, next) {
        let amount = 0
        Cart.findOne({where:{ProductId:+req.params.ProductId},include:Product})
        .then(data=>{
            let params = {
                UserId:req.userData.id,
                ProductId:req.params.ProductId,
                amount:data.amount
            }
            amount = data.amount
            console.log(amount)
            return Purchase.create(params)
        })
        .then(data=>{
            console.log(data.amount,'iniii amount')
            console.log(data.ProductId,'productID')
            return Product.findOne({where:{id:req.params.ProductId}})
        })
        .then(data=>{
            console.log(data,'ini dia')
            console.log(data.stock,'ini stock')
            console.log(amount,'ini amount')
            let params = {
                stock:data.stock - amount
            }
            console.log(params,'ini params')
            console.log(data.id,'dataID')
            return Product.update(params,{where:{id:req.params.ProductId}})
        })
        .then(data=>{
            amount = 0
            res.status(200).json(data)
        })
        .catch(err=>{
            next(err)
        })
    }
}


module.exports = PurchaseController