'use strict'

const { User } = require('../models')
const { checkPassword } = require('../helpers/bcryptjs')
const { generateToken } = require('../helpers/jwt')


class UserController {
  static async register (req, res, next) {
    // console.log('HIT');
    const inputUser = {
      name : req.body.name,
      email : req.body.email,
      password : req.body.password
      // role : 'customer'
    }
    console.log(inputUser);
    try {
      const newUser = await User.create(inputUser)
      const name = newUser.name
      const email = newUser.email
      return res.status(201).json({ name, email })
    } catch (err) {
      next (err)
    }
  }

  static async login (req, res, next) {
    const { email, password } = req.body
    console.log(email, password, "HIT");

    try {
      const userLogin = await User.findOne({ where : { email } })
      // console.log(userLogin);
      if (!userLogin) {
        throw { message : "Invalid email or password", statusCode : 400 }
      } else {
        
        if (checkPassword(password, userLogin.password)) {
          const access_token = generateToken(userLogin)
          // console.log(access_token);
          const name = userLogin.name
          const role = userLogin.role
          const id = userLogin.id
          // const id = userLogin.id
          // console.log(id);
          return res.status(200).json({ access_token, email, name, role, id })
        } else {
          
          throw { message : "Invalid email or password", statusCode : 400}
        }
      }
    } catch (err) {
      next (err)
    }
  }
}


module.exports = UserController