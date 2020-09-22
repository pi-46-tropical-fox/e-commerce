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
      Cart.belongsTo(models.User);
      Cart.belongsTo(models.Product);
    }
  };
  Cart.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    quantity: {
      type: DataTypes.INTEGER,
      validate: {
        min: {
          args: [0],
          msg: "Quantity must be greater than or equals to 0"
        },
        notEmpty: {
          args: true,
          msg: "Quantity cannot be left blank!"
        },
        isInt: {
          args: true,
          msg: "Quantity must be in numeric format!"
        }
      }
    },
    status: {
      type: DataTypes.BOOLEAN, 
      validate: {
        notEmpty: {
          args: true,
          msg: "Status cannot be left blank!"
        },
        isBoolean(value) {
          if (typeof value !== "boolean") {
            throw new Error("Status must be boolean!");
          }
        }
      }
    },
    UserId: DataTypes.INTEGER,
    ProductId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Cart',
  });
  Cart.beforeCreate((cart, options) => {
    if (!cart.quantity) {
      cart.quantity = 1;
    }
    if (!cart.status) {
      cart.status = false
    }
  });
  return Cart;
};