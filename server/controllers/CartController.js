const { Cart, Product } = require("../models");

class CartController {

  static async addCart (req, res, next) {
    try {
      const cart = await Cart.findOne({
        where: {
          UserId: +req.userData.id,
          ProductId: +req.params.productId,
          status: false
        },
        include: [ Product ]
      });
      if (cart) {
        if (cart.quantity >= cart.Product.stock) {
          // return res.status(400).json({ message: "Quantity exceeds stock!" });
          throw { message: "Quantity exceeds stock!", statusCode: 400 };
        }
        const updateCart = await Cart.update({
          quantity: cart.quantity + 1
        }, {
          where: {
            UserId: +req.userData.id,
            ProductId: +req.params.productId
          },
          returning: true
        });
        return res.status(200).json(updateCart[1][0]);
      } else {
        const addCart = await Cart.create({
          UserId: +req.userData.id,
          ProductId: +req.params.productId
        });
        return res.status(201).json(addCart);
      }
    } catch (err) {
      console.log(err, "<<<< error in addCart CartController");
      return next(err);
    }
  }

  static async showAllCarts (req, res, next) {
    try {
      const cart = await Cart.findAll({
        where: {
          UserId: +req.userData.id,
          status: false
        },
        include: [ Product ],
      });
      return res.status(200).json(cart);
    } catch (err) {
      console.log(err, "<<<< error in showAllCarts CartController");
      return next(err);
    }
  }

  static async getCartById (req, res, next) {
    try {
      const cart = await Cart.findByPk(+req.params.id, {
        include: [ Product ]
      });
      return res.status(200).json(cart);
    } catch (err) {
      console.log(err, "<<<< error in getCartById CartController");
      return next(err);
    }
  }

  static async updateCart (req, res, next) {
    try {
      const checkQuantity = await Cart.findByPk(+req.params.id, {
        include: [ Product ]
      });
      // const { quantity, status } = req.body;
      if (checkQuantity.quantity > checkQuantity.Product.stock) {
        // return res.status(400).json({ message: "Quantity exceeds stock!" });
        throw { message: "Quantity exceeds stock!", statusCode: 400 };
      } else if (checkQuantity.quantity <= 1) {
        await Cart.destroy({
          where: {
            id: +req.params.id
          }
        });
        return res.status(200).json({ message: "A product has been removed from cart" });
      } else {
        const cart = await Cart.update({
          quantity: checkQuantity.quantity - 1
        }, {
          where: {
            id: +req.params.id
          },
          returning: true
        });
        return res.status(200).json(cart[1][0]);
      }
    } catch (err) {
      console.log(err, "<<<< error in updateCart CartController");
      return next(err);
    }
  }

  static async deleteCart (req, res, next) {
    try {
      await Cart.destroy({
        where: {
          id: +req.params.id
        }
      });
      return res.status(200).json({ message: "A product has been removed from cart" });
    } catch (err) {
      console.log(err, "<<<< error in deleteCart CartController");
      return next(err);
    }
  }

  static async checkout (req, res, next) {
    try {
      const cart = await Cart.findByPk(+req.params.id, {
        include: [ Product ]
      });
      await Product.update({
        stock: cart.Product.stock - cart.quantity
      }, {
        where: {
          id: cart.ProductId
        },
        returning: true
      });
      await Cart.update({
        status: true
      }, {
        where: {
          id: +req.params.id
        },
        returning: true
      });
      return res.status(200).json({ message: "Checkout Success!" });
    } catch (err) {
      console.log(err, "<<<< error in checkout CartController");
      return next(err);
    }
  }

}

module.exports = CartController;