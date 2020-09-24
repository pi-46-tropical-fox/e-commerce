const { Cart, Product } = require("../models");

class CartController {
  static addCart(req, res, next) {
    let dataProduct = {};
    Product.findByPk(req.params.productId)
      .then((data) => {
        console.log(data);
        dataProduct = data;
        return Cart.findOne({
          where: {
            ProductId: data.id,
            //TO BE UPDATED BY REQ USER DATA
            UserId: req.userData.id,
            status: 'active'
          },
        });
      })
      .then((data) => {
        if (!data && dataProduct.stock>0) {
          console.log("gk ada");
          let cartObj = {
            quantity: 1,
            status: "active",
            //TO BE UPDATED BY USERDATA
            UserId: req.userData.id,
            ProductId: req.params.productId,
          };
          return Cart.create(cartObj);
        } else {
          if(dataProduct.stock == 0) {
            return res.status(400).json({ message: "No Stock!" });
          }else if (dataProduct.stock > data.quantity) {
            return Cart.update(
              { quantity: data.quantity + 1 },
              {
                where: {
                  Id: data.Id,
                },
              }
            );
          } else {
            return res.status(400).json({ message: "Limited Stock!" });
          }
        }
      })
      .then((data) => {
        return res.send(data);
      })
      .catch((err) => {
        console.log(err);
        return next(err);
      });
  }

  static getCarts(req, res, next) {
    Cart.findAll({
      include: [Product],
    })
      .then((data) => {
        return res.status(200).json(data);
      })
      .catch((err) => {
        console.log(err);
        return next(err);
      });
  }

  static deleteCart(req, res, next) {
    Cart.destroy({
      where: {
        Id: req.params.id,
      },
    })
      .then((data) => {
        return res
          .status(200)
          .json({ message: "Successfully delete cart product" });
      })
      .catch((err) => {
        return next(err);
      });
  }

  static updateCartsProducts(req, res, next) {
    let cartData = [];
    let store = null;
    
    Cart.findAll({
      where: {
        //TO BE UPDATED
        UserId: req.userData.id,
        status: 'active'
      }
    })
      .then(data => {
        cartData = data
        data.forEach(element => {
          Product.findByPk(element.ProductId)
          .then(data => {
            console.log(data, "<<<ini data find")
            store = data.stock - element.quantity

            Product.update({stock: store}, {
              where: {
                id: element.ProductId
              }
            })

            Cart.update({status: 'inactive'},{
              where: {
                Id: element.Id
              }
            })
          })

        });
      })
      .then(data => {
        return res.status(200).json({message: 'Checkout Success!'})
      })
      .catch(err => {
        return next(err)
      })
  }

  static updateQuantity (req, res, next) {
    Cart.findOne({
      where: {
        Id: req.params.id
      },
      include: [ Product ]
    })
      .then(data => {
        if(data.Product.stock >= req.body.updatedQty) {
          return Cart.update({quantity: req.body.updatedQty}, {where: {
            Id: req.params.id
          }})
        }else {
          return res.status(400).json({message: 'Limited Stock!'})
        }
      })
      .then(data => {
        return res.status(201).json({message: 'Quantity updated successfully!'})
      })
      .catch(err => {
        console.log(err)
        return next(err);
      })
  }


}

module.exports = CartController;
