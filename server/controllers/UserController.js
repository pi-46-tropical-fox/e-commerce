'use strict'
const {User} = require(`../models`)
const {comparePass} = require(`../helpers/bcrypt`)
const {encode} = require(`../helpers/jwt`)
const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    service:"gmail",
    auth:{
        user:process.env.EMAIL,
        pass: process.env.PASSWORD
    }
})
console.log(process.env.EMAIL, process.env.PASSWORD)
console.log('<<<<<<<+++++++++++++>>>>>>>>>');
class UserController {
    
        static register(req, res, next) {
            const objUser = {
                name:req.body.name,
                email:req.body.email,
                password:req.body.password,
                role:'Costumer'
            }                       
            User.create(objUser)
            .then(result => {
                const emailSend = `
                <h3>Thanks for ${result.name} joining Obos E-Commerce </h3>
                <p>Time for shopping <b> ${result.name} </b> <p>
                <br><br><br><br>

                <p>Best Regard from Obos <p>
                <p>Email:obostea12@gmail.com<p>
                <p>WA:081391462098<p>
                <p>Hacktiv8 Student Phase2<p>
                `
                const emailFrom = {
                    from:process.env.EMAIL,
                    to: `${result.email}`,
                    subject:'Best regard from Obos E-Commerce',
                    html: emailSend
                }
                
                return transporter.sendMail(emailFrom)
                .then(send =>{
                res.status(201).json(result)
            })
            })
            .catch(err => {
                console.log(err)
                next(err)
            })
        }

    static login(req, res, next) {
        const {email, password} = req.body
        const error = {
            name: `otherError`,
            statusCode: 400,
            message: `Invalid Email or Password, please check again!`
        }

        User.findOne({where: {email}})
        .then(result => {
            if (result && comparePass(password, result.password)) {
                let {id, name, email, role} = result
                let access_token = encode({id, name, email, role})
                res.status(200).json({access_token, name, role})
            } else {
                throw error
            }
        })
        .catch(err => {
             console.log(err)
            next(err)
        })
    }

    static getPayment(req, res){
        var request = require('request');

        var dataString = 'external_id=testing_id_123&type=DYNAMIC&callback_url=https://yourwebsite.com/callback&amount=1500';
        
        var options = {
            url: 'https://api.xendit.co/qr_codes',
            method: 'POST',
            body: dataString,
            auth: {
                'user': 'xnd_development_O46JfOtygef9kMNsK+ZPGT+TeStIngw3Dn+R1k+2fT/7GlCAN3jg==',
                'pass': ''
            }
        };
        
        function callback(error, response, body) {
            if (!error && response.statusCode == 200) {
                console.log(body);
            }
        }
        request(options, callback);
    }
}   

module.exports = UserController