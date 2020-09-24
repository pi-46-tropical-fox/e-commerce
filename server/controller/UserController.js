const { signPayload } = require('../helpers/jwt')
const { verifyPassword } = require('../helpers/password')
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
        const { email, password } = req.body

        const user = await User.findOne({
            where : {
                email
            }
        })
        
        if(user){
            const passwordCorrect = bcrypt.compareSync(password, user.password)

            if(!passwordCorrect){
                res.status(401).json({message : 'Email/Password combination not found!'})
                return
            }

            const access_token = signPayload({ id : user.id, email : user.email })
            res.status(200).json({
                id : user.id,
                email : user.email,
                access_token
            })
        } else {
            res.status(401).json({message : 'Email/Password combination not found!'})
        }
    }
}


module.exports = UserController
