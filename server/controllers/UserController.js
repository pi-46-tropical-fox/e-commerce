const { checkPassword } = require('../helpers/bcrypt')
const { generateToken } = require('../helpers/jwt')
const {User} = require('../models')

class UserController {
    static login(req,res){
        // console.log(req.body)
        User.findOne({where:{email: req.body.email}})
        .then(user=>{
            let valid = checkPassword(req.body.password, user.password)
            if(valid){
                let access_token = generateToken(user)
                res.status(200).json({email:user.email, access_token, role: user.role})
            }else{
                res.status(400).json({message: 'Invalid Username or Password'})
            }
        })
        .catch(err=>{
            console.log(err)
            res.status(400).json({message: 'Invalid Username or Password'})
        })
    }
    static register(req,res){
        User.create({
            email: req.body.email,
            password: req.body.password,
            role: '',
            createdAt: new Date,
            updatedAt: new Date
        })
        .then(user=>{
            return res.status(201).json({id:user.id, email:user.email, role:user.role})
        })
        .catch(err=>{
            console.log(err)
            if(err.name === 'SequelizeValidationError'){
                let error = err.errors[0].message
                return res.status(400).json(error)
            } else {
                return res.status(500).json({message: 'Internal Server Error'})
            }
        })
    }
}

module.exports = UserController