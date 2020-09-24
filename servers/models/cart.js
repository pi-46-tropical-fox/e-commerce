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
        notEmpty: {
          args: true,
          msg: "Quantity can not be empty"
        },
        isNumeric: {
          args: true,
          msg: "Quantity must only contain number"
        },
        min(value){
          if(+value < 1){
            throw "Quantity must be minimum 1"
          }
        }
      }
    },
    status: DataTypes.STRING,
    totalPrice: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Cart',
  });

  Cart.beforeCreate((user, opt) => {
    user.status = 'Unpaid'
  })
  return Cart;
};