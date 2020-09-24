const {Cart, Product, sequelize} = require('../models')

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
      console.log('test');

      let {id} = req.params

      await Cart.destroy({where:{id}})

      return res.status(200).json({message: 'Success updating cart'})

    }catch(err){
      next(err)
    }
  }

  static async checkout (req, res, next){
    console.log('test');

    // const t = await sequelize.transaction();
    try{
      await sequelize.transaction(async (t) => {
        const {id} = req.userData
        let idArr = []
        let promises = []
        let cartsData = await Cart.findAll({where: {UserId: id, status: 'pending'}, }, { transaction: t })
        
        for await (let cart of cartsData){
          promises.push(
            await Product.findOne({where: {id: cart.ProductId}})
              .then((data)=> {
                let stock = +data.stock - +cart.quantity
                console.log(stock);
                if(stock < 0){
                  let err = {
                    statusCode : 400,
                    message: 'Not enough stock'
                  }
                  next(err)
                }else{
                  Product.update({stock}, {where: {id: data.id}})
                }
              })
          )

        }
        await Cart.update({status: 'complete'},{where: {UserId: id, status: 'pending'}, }, { transaction: t })
  
      });


      return res.status(200).json({message: 'Checkout complete'})

    }catch(err){
      next(err)
    }
  }
}


module.exports = CartController