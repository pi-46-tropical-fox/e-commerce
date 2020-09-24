const { User } = require('../models')
const { checkHash } = require('../helpers/hashPass')
const { generateToken } = require('../helpers/token')

class Controller {
  static async login(req, res, next) {
    try {
      const { email, password } = req.body

      const findUser = await User.findOne({ where: { email } })

      if (findUser) {
        const checkPass = checkHash(password, findUser.password)

        if (checkPass) {
          const token = generateToken({ id: findUser.id, email: findUser.email, role: findUser.role })

          res.status(200).json({ access_token: token, message : 'Logged In Successfull' })
        } else {
          throw { message: 'Invalid Username / Password', statusCode: 401 }
        }
      } else {
        throw { message: 'Invalid Username / Password', statusCode: 401 }
      }
    } catch (err) {
      next(err)
    }
  }

  static async register(req, res, next) {
    try {
      const { email, password } = req.body

      await User.create({ email, password, role: 'member' })

      res.status(201).json({ message : 'Successfully Registered' })
    } catch (err) {
      next(err)
    }
  }
}

module.exports = Controller