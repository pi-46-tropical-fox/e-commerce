const {Cart , Purchase ,Product} = require('../models')

class Controller {
    static get(req,res,next){
        Purchase.findAll({where:{UserId:req.user.id},include:Product})
        .then(data=>{
            res.status(200).json(data)
        })
        .catch(err=>{
            next(err)
        })
    }
    static add (req,res,next){
        let qty = 0
        Cart.findOne({where:{ProductId:req.params.productId},include:Product})
        .then(data=>{
            let params = {
                UserId:req.user.id,
                ProductId:req.params.productId,
                quantity:data.quantity
            }
            return Purchase.create(params)
        })
        .then(data=>{
            qty = data.quantity
            return Product.findOne({where:{id:req.params.productId}})
        })
        .then(data=>{
            let params = {
                stock:data.stock - qty
            }
            return Product.update(params,{where:{id:req.params.productId}})
        })
        .then(data=>{
            res.status(200).json(data)
        })
        .catch(err=>{
            next(err)
        })
    }
}

module.exports = Controller