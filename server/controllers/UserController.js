const {User} = require('../models')
const {compareBcrypt} = require('../helpers/bcrypt.js')
const {generateToken} = require('../helpers/jwt.js')
const nodemailer = require('nodemailer')


const transporter = nodemailer.createTransport({
    service:"gmail",
    auth:{
        user:"reg.easytravel@gmail.com",
        pass: process.env.PASSWORD
    }
})

class UserController {
    static register(req,res,next) { 
        
        var userObj = {
            email: req.body.email,
            password: req.body.password,
            role: req.body.role || null
        }
        User.create(userObj)
        .then(user => {
            const emailSend = `
                <h3>Registration for <b>${user.email}</b> is successful.</h3>
                <p> Don't wait anymore. Happy shopping! <p>
                `
            const emailFrom = {
                from:"reg.easytravel@gmail.com",
                to: `${user.email}`,
                subject:'Welcome to Thrift & co!',
                html: emailSend
            }
            const access_token = generateToken(user)

            return transporter.sendMail(emailFrom)
                .then(send =>{
                    res.status(201).json({email: user.email, access_token})
                })
        })
        .catch(err => {
            return next(err)
        })
    }

    static async login(req,res,next) {

        const {email,password} = req.body
        try {
            const user =  await User.findOne({where: {email}})
            console.log(user);
            if(!user) {
                throw {statusCode: 400, msg: "Register first!"}
            }

            const isValid = await compareBcrypt(password, user.password)
            
            if(isValid) {
                const access_token = generateToken(user)
                return res.status(200).json({id:user.id, email:user.email, access_token})
            } else {
                throw {statusCode: 400, msg: "Invalid username or password!"}
            }
            
        } catch(err) {
            return next(err)
        }
    }

}

module.exports = UserController