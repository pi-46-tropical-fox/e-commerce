const {User} = require(`../models`)
const {compare} = require(`../helpers/bcrypt`)
const {encode} = require(`../helpers/jwt`)

class Controller{
    static async login(req, res, next){
        const {email, password} = req.body
        const errorMsg = {message: "Invalid Email or Password", statusCode: 403}
        try {
            const user = await User.findOne({where: {email}})
            if(!user){
                throw errorMsg
            }
            const isValid = compare(password, user.password)    
            if(isValid) {
                const token = encode(user.email, user.id, user.role)
                return res.status(200).json({
                    message: "Successfully login",
                    data: {
                        id: user.id,
                        email: user.email
                    },
                    access_token: token
                })
            } else {
                throw errorMsg
            }
        } catch(err) {
            return next(err)
        }
    }

    static async register (req, res, next) {
        const {email, password} = req.body
        try{
            const user = await User.create({email, password})
            if(user){
                return res.status(201).json({
                    data:{
                        id: user.id,
                        email: user.email
                    }
                })
            }else{
                throw {message: "Bad request", statusCode: 400}
            }
        }catch(err){
            return next(err)
        }
    }

    static async addMoney (req, res, next) {
        const inputMoney = req.body.money
        try{
            const user = await User.findByPk({id: req.userData.id})
            if(!user){
                throw {message: "User not found", statusCode: 404}
            }

            const updateMoney = await User.update({money: user.money + inputMoney}, {where: {id: req.userData.id}})
            if(updateMoney){
                return res.status(201).json({
                    message: "Successfully add money",
                    data: {
                        id: updateMoney.id,
                        money: updateMoney.money
                    }
                })
            }else{
                throw {message: "Bad request", statusCode: 400}
            }
        }catch(err){
            return next(err)
        }
    }
}

module.exports = Controller