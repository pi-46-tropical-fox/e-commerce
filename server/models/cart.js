'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Cart.belongsTo(models.User)
      Cart.belongsTo(models.Product)
    }
  };
  Cart.init({
    ProductId: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER,
    quantity: {
      type: DataTypes.INTEGER,
      validate: {
        isNumeric: {
          args : true,
          msg : 'Invalid quantity request'
        },
        min: {
          args: 1,
          msg:  'Invalid quantity request'
        },
        notNull: {
          args : true,
          msg : 'Invalid quantity request'
        },
        notEmpty: {
          args : true,
          msg : 'Invalid quantity request'
        }
      },
      allowNull : false
    },
    total: DataTypes.INTEGER,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Cart',
    hooks : {
      beforeCreate(cartShop) {
        cartShop.status = 'beforeCheckout'
      }
    }
  });
  return Cart;
};