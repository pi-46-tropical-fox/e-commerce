'use strict'

const { verifyToken } = require('../helpers/jwt')
const { User } = require('../models')

const authentication = async (req, res, next) => {
  const { access_token } = req.headers
  console.log(req.headers);
  // console.log('HALO');
  // console.log(req.headers);
  console.log(access_token);
  try {
    
    const userData = await verifyToken(access_token)
    let user = await User.findOne({ where : { email : userData.email } })
    // console.log(user);
    if (user) {
      req.userData = userData
      // console.log(req.params.id, 'INI PARAMS');
      // console.log(user, 'ini user');
      // console.log(req.headers);
      console.log(req.params);
      // console.log('========= ini userData', userData);
      next()
    } else {
      throw { message : 'User is not authenticated', statusCode : 401 }
    }
  } catch (err) {
    return next (err)
  }
}


module.exports = {
  authentication
}