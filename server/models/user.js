'use strict';
const bcrypt = require('bcrypt')
const saltRounds = 2
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    User.hasMany(models.Product)
    User.belongsToMany(models.Product, { through: models.Cart })
    }
  };
  User.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Please do not leave empty email' 
        },
        notNull: {
          msg: 'Please do not leave email null' 
        },
        duplicate(input){
          return User.findAll({
            where: { email: input }
          })
          .then(data =>{
            if(data.length > 0){
              throw new Error('Similar email has been used.')
            }
          })
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Please do not leave empty password' 
        },
        notNull: {
          msg: 'Please do not leave password null' 
        }
      }
    },
    status: DataTypes.STRING

  }, {
    sequelize,
    modelName: 'User',
  });
  User.addHook('beforeCreate', (user,options) => {
    user.password = bcrypt.hashSync(user.password, saltRounds)
    if(user.status == "Admin"){
      user.status = "Admin"
    } else if (!user.status || user.status == 'Customer'){
      user.status = "Customer"
    }
  })
  return User;
};