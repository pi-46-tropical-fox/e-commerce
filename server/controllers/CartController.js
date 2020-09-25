'use strict'

const { Cart, User, Product } = require('../models')

class CartController {

  static async addCart(req, res, next) {
    // Input Cart
    const inputCart = {
      ProductId : +req.params.product_id,
      UserId : +req.userData.id,
      quantity : req.body.quantity
    }

    try {

    // isCart?
    // console.log('HIT');
      const checkCart = await Cart.findOne({
        where : {
          ProductId : inputCart.ProductId,
          UserId : inputCart.UserId,
          status: 'beforeCheckout'
        }
      })

    // isSufficientStock?
      const checkStockProduct = await Product.findByPk(inputCart.ProductId)

    // No Cart
      if (!checkCart) {
        // Stock Sufficient
        if (checkStockProduct.stock >= inputCart.quantity) {
          const createCart = await Cart.create(inputCart)
          return res.status(201).json(createCart)
        } else {
          // Stock not sufficient
          // console.log('HIT');
          return res.status(400).json({ 
            errors : [
              `Sorry our stock is only ${checkStockProduct.stock}`
            ]
          })
        }

    // There is existing cart
      } else {
        // Stock sufficient
        // console.log('HIT');
        if (checkStockProduct.stock >= inputCart.quantity + checkCart.quantity) {
          // console.log('HIT');
          const updateCart = {
            ProductId : +req.params.product_id,
            UserId : +req.userData.id,
            quantity : +req.body.quantity + checkCart.quantity
          }

          const updateExistingCart = await Cart.update(updateCart, {
            where : {
              ProductId : updateCart.ProductId,
              UserId : updateCart.UserId
            }
          })
          const showUpdatedCart = await Cart.findOne({
            where : {
              ProductId : updateCart.ProductId,
              UserId : updateCart.UserId
            }
          })
          return res.status(200).json(showUpdatedCart)
        }

        else {
          return res.status(400).json({ 
            errors : [`Sorry our stock is only ${checkStockProduct.stock}`
          ]})
        }
      }
    } catch (err) {
      console.log(err);
      next (err)
    }
  }

  static async updatingQtyCart (req, res, next) {
    const updateCart = {
      ProductId : +req.params.product_id,
      UserId : +req.userData.id,
      quantity : +req.body.quantity
    }

    try {
      const updateExistingCart = await Cart.update(updateCart, {
        where : {
          ProductId : updateCart.ProductId,
          UserId : updateCart.UserId
        }
      })
      const showUpdatedCart = await Cart.findOne({
        where : {
          ProductId : updateCart.ProductId,
          UserId : updateCart.UserId
        }
      })
      
      return res.status(200).json(showUpdatedCart)
    } catch (err) {
      next (err)
    }
  }
  
  static async show (req, res, next) {
    // console.log(req.userData.id);
    let containerCart = {}
    
    const showCart = await Cart.findAll({
      include: [User, Product],
      where : {
        UserId : req.userData.id,
        status: 'beforeCheckout'
      }
    })

    const arrTotal = []
    showCart.forEach(el => {
      el.total = el.quantity * el.Product.price
      arrTotal.push(el.total)
    });

    // console.log(arrTotal);
    let endTotal = arrTotal.reduce(function(a, b) {
      return a+b
    })

    // push
    containerCart.finalTotal = endTotal

    // showCart.push({
    //   finalTotal: endTotal
    // })

    const arrProdId = []
    showCart.forEach(e => {
      arrProdId.push(e.ProductId)
    })

    // for (let i = 0; i < arrProdId.length; i++) {
      let updateGrandTotal = await Cart.update(
        { grandTotal : Number(endTotal) },
        { where : { UserId : req.userData.id } }
      )
    // }

    console.log(updateGrandTotal, 'upd');
    // showCart.grandTotal = endTotal

    const showFinalCart = await Cart.findAll({
      where : { UserId : req.userData.id }
    })
    
    containerCart.products = showCart
    // console.log(showFinalCart);
    // console.log(showCart);
    // console.log(showCart[showCart.length-1]);

    try {
      if (showCart[0]) {
      return res.status(200).json(containerCart)
      } else {
        return res.status(404).json({ message : `Sorry, your shopping cart is not exist` })
      }

    } catch (err) {
      next (err)
    }
  }

  static async removeItemCart (req, res, next) {
    // console.log(req.params.product_id);
    // console.log(req.params.user_id);
    try {
      const removeCart = await Cart.destroy ({ 
        where : { 
          ProductId : +req.params.product_id,
          UserId : +req.userData.id,
          status : 'beforeCheckout'
        } 
      })
      
      if (!removeCart) {
        throw { message : `Product does not exist!`, statusCode : 404 }
      } else {
        return res.status(200).json('Product has been successfully removed!')
      }
    } catch (err) {
      next (err)
    }
  }

  static async checkOut (req, res, next) {
    
    try {
      const findCheckOut = await Cart.update({ 
        status : 'afterCheckout' },
        { where : {
            UserId : req.userData.id
          } 
        })

      const findCart = await Cart.findAll({
        where : {
          UserId : req.userData.id
        }
      })

      // console.log(findCheckOut, 'FINDCHECKOUT');
      // console.log(findCart, 'FINDCART');

      const arrayProductId = []
      const arrayQty = []
      findCart.forEach(e => {
        arrayProductId.push(e.ProductId)  
        arrayQty.push(e.quantity)
      });

      // console.log(arrayQty);
      // console.log(arrayProductId);
      
      
      for (let i = 0; i < arrayProductId.length; i++) {
        // find stock
        let findStockProduct = await Product.findOne({
          where : {
            id : arrayProductId[i]
          }
        })
        // console.log(findStockProduct);
        // console.log(findStockProduct.stock);
        // console.log(arrayQty[i]);
        
        let stockUpToDate = findStockProduct.stock - arrayQty[i]
        console.log(stockUpToDate);
        // console.log(stockUpToDate);

        // decrease stock
        let decreaseStock = await Product.update(
          { stock : Number(stockUpToDate) },
          { where : { id : +arrayProductId[i] } }
        )
        // console.log(arrayQty[i]);
      }

      return res.status(200).json(`Successfully check out`)
    } catch (err) {
      next (err)
    }
  }


}

module.exports = CartController