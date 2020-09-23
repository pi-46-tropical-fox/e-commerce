const { Wishlist, Product } = require("../models");

class WishlistController {

  static async addWishlist (req, res, next) {
    try {
      const wishlist = await Wishlist.findOne({
        where: {
          UserId: +req.userData.id,
          ProductId: +req.params.productId
        }
      });
      if (wishlist) {
        // return res.status(400).json({ message: "Product has already existed in the wishlist" });
        throw { message: "Product has already existed in the wishlist", statusCode: 400 };
      }
      const addWishlist = await Wishlist.create({
        UserId: +req.userData.id,
        ProductId: +req.params.productId
      });
      return res.status(201).json(addWishlist);
    } catch (err) {
      console.log(err, "<<<< error in add addWishlist WishlistController");
      return next(err);
    }
  }

  static async showAllWishlist (req, res, next) {
    try {
      const wishlists = await Wishlist.findAll({
        where: {
          UserId: +req.userData.id,
        },
        include: [ Product ]
      });
      return res.status(200).json(wishlists);
    } catch (err) {
      console.log(err, "<<<< error in add showAllWishlist WishlistController");
      return next(err);
    }
  }
  
  static async getWishlistById (req, res, next) {
    try {
      const wishlist = await Wishlist.findByPk(+req.params.id, {
        include: [ Product ]
      });
      return res.status(200).json(wishlist);
    } catch (err) {
      console.log(err, "<<<< error in add getWishlistById WishlistController");
      return next(err);
    }
  }

  // static async updateWishlist (req, res, next) {
  //   try {
  //   } catch (err) {
  //     console.log(err, "<<<< error in add updateWishlist WishlistController");
  //     return next(err);
  //   }
  // }

  static async deleteWishlist (req, res, next) {
    try {
      await Wishlist.destroy({
        where: {
          id: +req.params.id
        }
      });
      return res.status(200).json({ message: "A product has been removed from wishlist" })
    } catch (err) {
      console.log(err, "<<<< error in add deleteWishlist WishlistController");
      return next(err);
    }
  }

}

module.exports = WishlistController;