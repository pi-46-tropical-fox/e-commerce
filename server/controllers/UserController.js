const {User} = require('../models')
const comparePassword = require('../helpers/comparePass')
const { generateToken } = require('../helpers/jwt')

class UserController {
    static login(req, res, next) {
        let option = {
            where: {
                email: req.body.email
            }
        }

        User.findOne(option)
        .then(user => {
            if (!user) {
                throw {statusCode: 404, message: 'User not found'}
            } else {
                if (user.role == 'admin' && req.body.password == user.password) {
                    const access_token = generateToken(user)
                    return res.status(200).json({name: user.name, email: user.email, role: user.role, access_token})
                } else {
                    let valid = comparePassword(req.body.password, user.password)
                    const access_token = generateToken(user)
                    if (valid) {
                        return res.status(200).json({name: user.name, email: user.email, role: user.role, access_token})
                    } else {
                        throw {statusCode: 400, message: 'Invalid email or password'}
                    }
                }
            }
        })
        .catch(err => {
            next(err)
        })
    }

    static register(req, res, next) {
        let registerUser = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            role: req.body.role
        }

        User.create(registerUser)
        .then(user => {
            return res.status(201).json(user)
        })
        .catch(err => {
            next(err)
        })
    }
}

module.exports = UserController