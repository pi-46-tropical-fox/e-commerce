const { Cart, Product } = require("../models");
const { Op } = require("sequelize");

class Controller {
  static show(req, res, next) {
    Cart.findAll({
      where: { UserId: req.userData.id, status: false },
      include: Product,
    })
      .then((data) => {
        return res.status(201).json(data);
      })
      .catch((err) => {
        return next(err);
      });
  }

  static add(req, res, next) {
    Cart.findOne({
      where: {
        [Op.and]: [
          { UserId: req.userData.id },
          { ProductId: req.params.id },
          { status: false },
        ],
      },
      include: Product,
    })
      .then((data) => {
        console.log(data);
        if (!data) {
          let params = {
            quantity: 0,
            status: false,
            UserId: req.userData.id,
            ProductId: req.params.id,
          };
          return Cart.create(params);
        } else if (data.Product.stock > data.quantity) {
          let params = {
            quantity: data.quantity + 1,
          };
          return Cart.update(params, {
            where: { id: req.params.id, UserId: req.userData.id },
          });
        } else {
          throw { message: "Out of stock", statusCode: 400 };
        }
      })
      .then((user) => {
        return res.status(200).json(user);
      })
      .catch((err) => {
        console.log(err);
        return next(err);
      });
  }

  static find(req, res, next) {
    Cart.findOne({ where: { id: req.params.id } })
      .then((data) => {
        return res.status(201).json(data);
      })
      .catch((err) => {
        return next(err);
      });
  }

  static editQuantity(req, res, next) {
    Cart.findOne({
      where: {
        UserId: req.userData.id,
        ProductId: req.params.cartId,
      },
      include: Product,
    })
      .then((data) => {
        console.log(data.Product.stock);
        if (data.Product.stock > data.quantity) {
          if (+data.quantity > +req.body.quantity) {
            let params = {
              quantity: +req.body.quantity,
            };
            return Cart.update(params, {
              where: { ProductId: req.params.cartId, UserId: req.userData.id },
            });
          } else {
            let params = {
              quantity: +req.body.quantity + +data.quantity,
            };
            return Cart.update(params, {
              where: { ProductId: req.params.cartId, UserId: req.userData.id },
            });
          }
        } else {
          throw { message: "Out of stock", statusCode: 400 };
        }
      })
      .then((user) => {
        return res.status(200).json(user);
      })
      .catch((err) => {
        next(err);
      });
  }

  static async edit(req, res, next) {
    try {
      console.log("TEST");
      const cart = await Cart.findAll({
        where: { UserId: req.userData.id },
        include: Product,
      });
      // console.log(cart);

      let total = 0;
      for (const sold of cart) {
        let leftStock = { stock: +sold.Product.stock - +sold.quantity };
        await Product.update(leftStock, { where: { id: sold.ProductId } });

        total = +sold.quantity * +sold.Product.price;
        await Cart.update(
          { status: true },
          { where: { UserId: req.userData.id } }
        );
        console.log(sold.id);
      }

      return res.status(200).json(total);
    } catch (error) {
      console.log(error);
      return next(error);
    }
  }

  static remove(req, res, next) {
    let id = { where: { ProductId: req.params.id } };
    console.log(id);

    Cart.destroy(id)
      .then((data) => {
        console.log(data);
        return res.status(200).json(data);
      })
      .catch((err) => {
        console.log(err, "ini error delete");
        return next(err);
      });
  }
}

module.exports = Controller;
