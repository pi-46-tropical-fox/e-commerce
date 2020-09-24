'use strict'

const { Cart } = require('../models')

const authorizationCart = async (req, res, next) => {

  // console.log('HIT');
  // console.log(req.params);
  Cart.findAll({
    where : {
      UserId : +req.params.user_id
    }
  })
  .then(response => {
    // console.log(response);
    if (response != null) {
      next ()
    } else {
      return res.status(400).json({ message : `Sorry, you don't have any cart`})
    }
  })
  
  .catch(next)
  
}

module.exports = {
  authorizationCart
}