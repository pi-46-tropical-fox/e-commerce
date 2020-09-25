const { signPayload } = require('../helpers/jwt')
const { User } = require('../models')
const bcrypt = require('bcryptjs')

class UserController{
    static async register(req, res, next){
        try{
            const { email, password, name } = req.body
    
            const newUser = await User.create({
                email, password, name
            })

            res.status(201).json({ id : newUser.id, email : newUser.email, password : newUser.password })
        } catch(e){
            next(e)
        }
    }

    static async login(req, res, next){
        try{
            const { email, password } = req.body

            const user = await User.findOne({
                where : {
                    email
                }
            })
            
            if(user){
                const passwordCorrect = bcrypt.compareSync(password, user.password)
    
                if(!passwordCorrect){
                    throw { message : 'Email/Password combination not found!', statusCode : 401 }
                }
    
                const access_token = signPayload({ id : user.id, email : user.email })
                res.status(200).json({
                    id : user.id,
                    email : user.email,
                    access_token
                })
            } else {
                throw { message : 'Email/Password combination not found!', statusCode : 401 }
            }
        }catch(e){
            next(e)
        }
    }
}


module.exports = UserController
