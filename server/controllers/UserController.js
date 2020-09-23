const { checkPassword } = require('../helpers/bcrypt')
const { generateToken } = require('../helpers/jwt')
const {User} = require('../models')
const {OAuth2Client} = require('google-auth-library')

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
    static googleLogin(req,res,next){
        console.log(req.headers.googleaccesstoken)
        const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)
        const google_access_token = req.headers.googleaccesstoken
        let email_google
        let firstname_google
        let lastname_google
        client.verifyIdToken({
            idToken: google_access_token,
            audience: process.env.CLIENT_ID
        })
        .then(ticket => {
            return ticket.getPayload()
        })
        .then(payload => {
            console.log(payload)
            email_google = payload.email
            return User.findOne({where:{email:payload.email}})
        })
        .then(user=>{
            if(!user){
                return User.create({
                    email: email_google,
                    password: 'password'
                })
            }else{
                return user
            }
        })
        .then(user=>{
            const payload = {email:user.email, id: user.id}
            const access_token = generateToken(payload)

            return res.status(200).json({id:user.id,email:user.email,access_token})
        })
        .catch(err=>{
            // next(err)
            console.log(err)
        })
    }
}

module.exports = UserController