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
      validate: {
        notNull: {
          msg: "You must specify the product name!"
        },
        notEmpty: {
          msg: "You must specify the product name!"
        },
      }
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: "You must specify the product price!"
        },
        notEmpty: {
          msg: "You must specify the product price!"
        },
        min: {
          args: 0,
          msg: "The product price must be a positive number!"
        }
      }
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: "You must specify the product price!"
        },
        notEmpty: {
          msg: "You must specify the product price!"
        },
        min: {
          args: 0,
          msg: "The product stock must be a positive number!"
        }
      }
    },
    CategoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "You must specify the category!"
        }
      },
      references: {
        model: 'Categories',
        key: 'id'
      }
    }
  }, {
      sequelize,
    hooks: {
      beforeValidate(instance){
        instance.stock = !!instance.stock ? Number(instance.stock) : instance.stock
        instance.price = !!instance.price ? instance.price * 100 : instance.price
      }
    },
    modelName: 'Product',
  });
  return Product;
};