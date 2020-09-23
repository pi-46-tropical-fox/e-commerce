'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Product.belongsToMany(models.User, { through: models.Cart });
      Product.belongsTo(models.Banner)
    }
  };
  Product.init({
    name: DataTypes.STRING,
    image_url: DataTypes.STRING,
    stock: DataTypes.INTEGER,
    category: DataTypes.STRING,
    price: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};