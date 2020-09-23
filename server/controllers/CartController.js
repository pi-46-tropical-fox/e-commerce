const { Cart, Product } = require("../models");
const { Op } = require("sequelize");
const nodemailer = require('nodemailer');

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
      const { totalPrice } = req.body;
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
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        auth: {
          user: process.env.email,
          pass: process.env.password
        }
      });
      
      const mailOptions = {
        from: 'PT. AmaJohn Tbk.',
        to: req.userData.email,
        subject: 'AmaJohn Transaction Summary',
        html: `
          <h3>AmaJohn Transaction Summary</h3>
          <p>Dear Our Valued Customers, </p>
          <p>A transaction Rp.${Number(totalPrice).toLocaleString("de-DE")} has occurred. Please wait for your orders at home.</p>
          <p>#StayAtHome #StayPositive</p>
          <br><br>
          <p>Best regards, </p>
          <p>AmaJohn Team</p>
        `
      };
      
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
      return res.status(200).json({ message: "Checkout Success!" });
    } catch (err) {
      console.log(err, "<<<< error in checkout CartController");
      return next(err);
    }
  }

  static async checkoutAll (req, res, next) {
    // console.log(req.body, "<<<< ini req.body")
    try {
      const { activeCarts, totalPrice } = req.body;
      const cartIds = [];
      const errMessages = [];
      // const productIds = [];
      activeCarts.forEach((datum) => {
        if (datum.quantity <= datum.Product.stock) {
          cartIds.push(datum.id)
          // productIds.push(datum.Product.id);
        } else {
          errMessages.push(`Only ${datum.Product.stock} of ${datum.Product.name} left!`);
        }
      });
      console.log(cartIds, 'ini ya')
      if (cartIds.length === activeCarts.length) {
        await Cart.update({
          status: true
        }, {
          where: {
            id: {
              [Op.in]: cartIds
            }
          }
        });
        activeCarts.forEach(async(datum) => {
          await Product.update({
            stock: datum.Product.stock - datum.quantity
          }, {
            where: {
              id: datum.Product.id
            }
          });
        });
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          host: 'smtp.gmail.com',
          auth: {
            user: process.env.email,
            pass: process.env.password
          }
        });
        
        const mailOptions = {
          from: 'PT. AmaJohn Tbk.',
          to: req.userData.email,
          subject: 'AmaJohn Transaction Summary',
          html: `
            <h3>AmaJohn Transaction Summary</h3>
            <p>Dear Our Valued Customers, </p>
            <p>A transaction Rp.${Number(totalPrice).toLocaleString("de-DE")} has occurred. Please wait for your orders at home.</p>
            <p>#StayAtHome #StayPositive</p>
            <br><br>
            <p>Best regards, </p>
            <p>AmaJohn Team</p>
          `
        };
        
        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.log(error);
          } else {
            console.log('Email sent: ' + info.response);
          }
        });
        return res.status(200).json({ message: 'Checkout Success' });
      } else {
        throw({ message: errMessages[0], statusCode: 400 });
      }
    } catch (err) {
      console.log(err, "<<<< error in checkoutAll CartController");
      return next(err);
    }
  }

}

module.exports = CartController;