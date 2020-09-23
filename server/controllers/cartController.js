const {Cart, Product} = require('../models')

class CartController{
  static async createCart(req, res, next){
    try{
      // console.log('masuk sini')
      let {id} = req.userData
      let {ProductId, quantity, status} = req.body
      
      let cartData = await Cart.findOne({where: {UserId: id, ProductId}, include: Product})
      // console.log(cartData);
      if (cartData){
        quantity = +quantity + +cartData.quantity
        // console.log(cartData.Product.stock);
        if (cartData.Product.stock < quantity){
          let err = {
            statusCode: 400,
            message: 'Not enough stock'
          }
          next(err)
        }else{
          await Cart.update({quantity}, {where: {id: cartData.id}})
          return res.status(201).json({id: cartData.id, message: 'Successfully adding item to cart'})

        }
      } else {
        let cartData = await Cart.create({UserId: id, ProductId, quantity, status})
        return res.status(201).json({id: cartData.id, message: 'Successfully adding item to cart'})

      }
      
    }catch(err){
      next(err)
    }
  }

  static async getCarts(req, res, next){
    try{
      let {id} = req.userData

      let cartsData = await Cart.findAll({where: {UserId: id}, include: Product})

      return  res.status(200).json({cartsData})
    }catch(err){
      next(err)
    }
  }

  static async updateQuantity(req,res,next){
    try{
      // let {id} = req.userData
      let {id} = req.params
      let {quantity} = req.body

      await Cart.update({quantity}, {where: {id}})

      return res.status(200).json({message: 'Success updating cart'})
    }catch(err){
      next(err)
    }
  }

  static async deleteCart(req,res,next){
    try{
      let {id} = req.params

      await Cart.destroy({where:{id}})

      return res.status(200).json({message: 'Success updating cart'})

    }catch(err){
      next(err)
    }
  }
}


module.exports = CartController