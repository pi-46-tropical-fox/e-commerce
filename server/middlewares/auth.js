const { verifyToken } = require("../helpers/jwt");
const { User, Cart, Wishlist } = require("../models");

const authentication = async (req, res, next) => {
  const { access_token } = req.headers;
  try {
    const userData = verifyToken(access_token);
    console.log(userData, "<<<< this is userData");

    let user = await User.findOne({
      where: {
        email: userData.email
      }
    });
    if (user) {
      req.userData = userData;
      next();
    } else {
      throw { message: "User is not authenticated", statusCode: 401 };
    }
  } catch(err) {
    console.log(err, "<<<< error in authentication");
    return next(err);
  }
}

const authorization = (req, res, next) => {
  const { access_token } = req.headers;
  const userData = verifyToken(access_token);
  console.log(userData, "<<<< this is userData");

  if (userData.role === "admin") {
    next();
  } else {
    throw { message: "Unauthorized Access", statusCode: 403 };
  }
}

const authorizeCart = async (req, res, next) => {
  try {
    const cart = await Cart.findByPk(+req.params.id);
    if (cart === null) {
      throw { message: "Not Found", statusCode: 404 };
    } else if (cart && cart.UserId === +req.userData.id) {
      next();
    } else {
      throw { message: "Unauthorized Access", statusCode: 403 };
    }
  } catch (err) {
    console.log("<<<< error in authorizeCart");
    return next(err);
  }
}

const authorizeWishlist = async (req, res, next) => {
  try {
    const cart = await Cart.findByPk(+req.params.id);
    if (cart === null) {
      throw { message: "Not Found", statusCode: 404 };
    } else if (cart && cart.UserId === +req.userData.id) {
      next();
    } else {
      throw { message: "Unauthorized Access", statusCode: 403 };
    }
  } catch (err) {
    console.log("<<<< error in authorizeWishlist");
    return next(err);
  }
}

module.exports = { authentication, authorization, authorizeCart, authorizeWishlist };