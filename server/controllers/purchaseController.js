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
            console.log(data,'<<ini data')
            let params = {
                UserId:req.user.id,
                ProductId:req.params.productId,
                quantity:data.quantity
            }
            qty = data.quantity
            console.log(qty)
            return Purchase.create(params)
        })
        .then(data=>{
            console.log(data.quantity,'iniii qty')
            console.log(data.ProductId,'productID')
            return Product.findOne({where:{id:req.params.productId}})
        })
        .then(data=>{
            console.log(data,'ini dia')
            console.log(data.stock,'ini stock')
            console.log(qty,'ini qtyy')
            let params = {
                stock:data.stock - qty
            }
            console.log(params,'ini params')
            console.log(data.id,'dataID')
            return Product.update(params,{where:{id:req.params.productId}})
        })
        .then(data=>{
            qty = 0
            res.status(200).json(data)
        })
        .catch(err=>{
            next(err)
        })
    }
}

module.exports = Controller