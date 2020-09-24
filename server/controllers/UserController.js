const { User } = require('../models');
const bcrypt = require('bcryptjs');
const { generateToken } = require('../helpers/jwt');
const transporter = require('../mailer/config')

class UserController {
  static register(req, res, next) {
    const { email, password } = req.body;
    User.create({ email, password })
    .then(user => {
      // console.log(transporter.Mail.auth, 'transporter');
      if(user) {
        const{ id, email } = user
        let mail = {
          from: process.env.EMAIL,
          to: `${email}`,
          subject: 'Registration Completed',
          text: 'Welcome to your mariopetoko account. Your registration completed'
        }
        
        transporter.sendMail(mail, function(error, info){
            if (error) {
                console.log(error,'<<<if');
            } else {
                console.log('Email sent: ' + info.response,",<<<<");
            }
        });
        console.log(user);
        return res.status(201).json({ id, email })
      } else {
        return res.status(400).json({message: 'register failed'})
      }
    })
    .catch(err => {
      console.log(err, 'catch');
      return res.status(500).json({message: "internal server error"})
    }) 
  }

  static login(req, res, next) {
    const { email, password } = req.body
    console.log(req.body,'ini req body');
    User.findOne({
      where: { email }
    })
    .then(user => {
      if(user) {
        console.log(user.role, 'masuk user then pertama');
        return user
      }
      return res.status(400).json({message:'invalid email or password'})
    })
    .then(user => {
      const isValid = bcrypt.compareSync(password, user.password)
      if(isValid) {
        const access_token = generateToken(user)
        return res.status(200).json({access_token})
      } else {
        return res.status(400).json({message: 'invalid email or password'})
      }
    })
    .catch(err => {
      // return res.status(500).json({message: "internal server error"})
      console.log(err);
    })
  }

}

module.exports = UserController;