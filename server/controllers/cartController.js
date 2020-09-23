const { Product, Cart } = require("../models");

class Controller {
  static get(req, res, next) {
    Cart.findAll({ where: { UserId: req.user.id }, include: Product })
      .then(data => {
        return res.status(200).json(data);
      })
      .catch((err) => {
        next(err);
      });
  }
  static add(req, res, next) {
    Cart.findOne({
      where: { UserId: req.user.id, ProductId: req.params.productId },include:Product
    })
      .then(data => {
        if (!data) {
          let params = {
            UserId: req.user.id,
            ProductId: req.params.productId,
          };
          return Cart.create(params);
        } else if ((data.Product.stock >= data.quantity || data.Product.stock == 1)) {
          let params = {
            quantity: data.quantity + 1,
          };
          return Cart.update(params, {
            where: { ProductId: req.params.productId , UserId:req.user.id }
          });
        } else {
          throw { message: `out of stock` };
        }
      })
      .then(data => {
        return res.status(200).json({ data, message: "success add to cart" });
      })
      .catch(err => {
        next(err);
      });
  }
  static getOne(req, res, next) {
    Cart.findAll({ where: { ProductId: req.params.productId } })
      .then(data => {
        return res.status(200).json(data);
      })
      .catch(err => {
        next(err);
      });
  }
  static edit(req, res, next) {
    let params = {
      status:true,
      quantity:1
    };
    Cart.update(params, { where: { ProductId: req.params.id } })
      .then(data => {
        return res.status(200).json(data);
      })
      .catch(err => {
        next(err);
      });
  }
  static delete(req, res, next) {
     Cart.destroy({where:{ProductId:req.params.id}})
    .then(data=>{
      return res.status(200).json({ message: `success deleting` })
    })
    .catch(err=>{
      next(err)
    })
  }
}

module.exports = Controller;
