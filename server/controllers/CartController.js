const { User, Product, Cart } = require('../models');

class CartController {
  static addCart(req, res, next) {
    let price = 0
    let quantity = 1
    Cart.findOne({
      where: {
        ProductId: req.params.ProductId,
        UserId: req.userData.id
      }
    })
      .then(data => {
        quantity += data.quantity
        return Cart.update({
          quantity: quantity,
          price: data.price * quantity,
        }, {
          where: { ProductId: req.params.ProductId }
        })
      })
      .then(update => {
        console.log(update)
        if (update[0] !== 0) {
          return res.status(200).json({ message: 'Sucessfully add cart' })
        }
      })
      .catch(err => {
        Product.findByPk(req.params.ProductId)
          .then(product => {
            price = product.price
            let payload = {
              quantity: 1,
              price: product.price,
              UserId: req.userData.id,
              ProductId: req.params.ProductId,
              createdAt: new Date,
              updatedAt: new Date
            }
            return Cart.create(payload)
          })
          .then(cart => {
            return res.status(201).json(cart)
          })
          .catch(err => {
            return res.status(500).json({ message: 'internal server error' })
          })
      })
  }
  static getCarts(req, res, next) {
    User
      .findByPk(req.userData.id, { include: Product })
      .then(result => {
        res.status(200).json(result.Products)
      })
      .catch(err => {
        next(err)
      })
  }
  static editQuantity(req, res, next) {
    const cartData = {
      where: {
        UserId: req.userData.id,
        ProductId: req.params.id
      }
    }
    const updateQty = {
      quantity: req.body.quantity
    }
    Cart
      .update(updateQty, cartData)
      .then(result => {
        res.status(200).json({ message: "Successfully edit quantity" })
      })
      .catch(err => {
        next(err)
      })
  }
  static deleteCart(req, res, next) {
    const cartDelete = {
      where: {
        UserId: req.userData.id,
        ProductId: req.params.id
      }
    }
    Cart
      .destroy(cartDelete)
      .then(result => {
        res.status(200).json({ message: "successfully delete cart" })
      })
      .catch(err => {
        next(err)
      })
  }
}

module.exports = CartController