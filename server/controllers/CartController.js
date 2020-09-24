const { Cart, Product } = require('../models')

class Controller {
  static async createCart(req, res, next) {
    try {
      const findCart = await Cart.findOne({ where: { ProductId: req.params.productId, UserId: req.userData.id } })

      if (findCart) {
        await Cart.increment({ quantity: 1 }, { where: { ProductId: req.params.productId } })

        res.status(201).json({ message: 'Successfully Added Cart' })
      } else {
        await Cart.create({ UserId: req.userData.id, ProductId: req.params.productId, quantity: '1' })

        res.status(201).json({ message: 'Successfully Added Cart' })
      }
    } catch (err) {
      next(err)
    }
  }

  static async showCart(req, res, next) {
    try {
      const cart = await Cart.findAll({ where: { UserId: req.userData.id }, include: [Product] })

      let totalPrice = 0;
      let totalItem = 0;

      cart.forEach(el => {
        totalPrice += el.Product.price * el.quantity
        totalItem += el.quantity
      });

      res.status(200).json({ cart, totalPrice, totalItem })
    } catch (err) {
      next(err)
    }
  }

  static async deleteCart(req, res, next) {
    try {
      await Cart.destroy({ where: { id: req.params.id } })

      res.status(200).json({ message: 'Successfully Removed From Cart' })
    } catch (err) {
      next(err)
    }
  }

  static async checkoutCart(req, res, next) {
    try {
      const findCart = await Cart.findAll({where : { UserId: req.userData.id }})

      findCart.forEach(async el => {
        console.log(el)
        await Product.decrement({ stock : el.quantity }, { where: { id : el.ProductId } })
      })

      await Cart.destroy({ where : { UserId: req.userData.id } })

      res.status(200).json({ message: 'Buy Successfully' })
    } catch(err) {
      console.log(err)
      next(err)
    }
  }

  static async editCart(req, res, next) {
    try {
      console.log(req.params.id)
      const { quantity } = req.body
      await Cart.update({quantity}, { where : { id: req.params.id } })

      res.status(200).json({ message : 'Changed Quantity Successfully' })
    } catch(err) {
      next(err)
    }
  }
}

module.exports = Controller