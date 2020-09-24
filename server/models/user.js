'use strict';
const {
  Model
} = require('sequelize');
const { hashPass } = require('../helpers/hashPass')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsToMany(models.Product, { through: models.Cart })
      User.hasMany(models.Cart)
    }
  };
  User.init({
    email: {
      type : DataTypes.STRING,
      allowNull: false,
      validate : {
        notEmpty: true,
        isEmail : true
      }
    },
    password: {
      type : DataTypes.STRING,
      allowNull : false,
      validate : {
        notEmpty : true
      }
    },
    role: {
      type : DataTypes.STRING,
      allowNull : false,
      validate : {
        notEmpty : true
      }
    }
  }, {
    hooks: {
      beforeCreate: (user, options) => {
        const hashed = hashPass(user.password)
        user.password = hashed
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};