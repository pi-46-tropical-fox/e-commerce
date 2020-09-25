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
      // define association here
      Product.belongsTo(models.Category)
      Product.hasMany(models.ProductImage, {
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      })
    }
  };
  Product.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    CategoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "You should specify the category!"
        }
      },
      references: {
        model: 'Categories',
        key: 'id'
      }
    }
  }, {
    sequelize,
      validate: {
        productName() {
          if (this.name === null || this.name === '') {
            return new Error(`You have to fill out the product name`)
          }
        },
        productPriceMustBeAPositiveNumber() {
          if (this.price === null || this.price === '') {
            return new Error(`You should specify the product price.`)
          } else {
            if (isNaN(this.price) || this.price < 0) return new Error(`The product price must be a positive number.`)
          }
        },
        productStockMustBeAPositiveNumber() {
          if (this.stock === null || this.stock === '') {
            return new Error(`You should specify the product stock.`)
          } else {
            if (isNaN(this.stock) || this.stock < 0) return new Error(`The product stock must be a positive number.`)
          }
        },
      },
    hooks: {
      beforeValidate(instance){
        instance.stock = !!instance.stock ? Number(instance.stock) : instance.stock
        instance.price = !!instance.price ? instance.price * 100 : instance.price
        console.log(instance.name, instance.stock, instance.price, instance.CategoryId);
      }
    },
    modelName: 'Product',
  });
  return Product;
};