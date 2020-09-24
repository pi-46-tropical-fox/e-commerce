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
    Product.belongsTo(models.User)
    Product.belongsToMany(models.User, { through: models.Cart })
    }
  };
  Product.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'Please do not leave empty name' },
        notNull: { msg: 'Please do not leave name null' }
      }
    },
    img_url: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Please do not leave empty img_url' 
        },
        notNull: {
          msg: 'Please do not leave img_url null' 
        }
      }
    },
    // price: DataTypes.INTEGER,
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notMinus(price){
          let num = Number(price)
          if(num < 0 ){
            throw new Error('Invalid price value (-)')
          }
        }
      }
    },
    // stock: DataTypes.INTEGER,
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notMinus(price){
          let num = Number(price)
          if(num < 0 ){
            throw new Error('Invalid stock value (-)')
          }
        }
      }
    },
    UserId: DataTypes.INTEGER,
    category: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "Please do not leave empty category" },
        notNull: { msg: "Please do not leave category null" },
      },
    },
    description: DataTypes.STRING,

  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};