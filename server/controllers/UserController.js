const { User } = require("../models");
const { generateToken } = require("../helpers/jwt");
const { checkPassword } = require("../helpers/bcrypt");
const { OAuth2Client } = require("google-auth-library");
const nodemailer = require('nodemailer');

class UserController {

  static async showHome(req, res, next) {
    try {
      return res.status(200).send("CMS by Full-Stuck Dev");
    } catch (err) {
      console.log(err, "<<<< error in showHome UserController");
      return next(err);
    }
  }

  static async register(req, res, next) {
    try {
      const { username, email, password, role } = req.body;
      const user = await User.create({
        username,
        email,
        password,
        role
      });
      const access_token = generateToken(user);
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        auth: {
          user: process.env.email,
          pass: process.env.password
        }
      });
      
      const mailOptions = {
        from: 'PT. AmaJohn Tbk.',
        to: user.email,
        subject: 'Welcome to AmaJohn',
        html: `
          <h3>Welcome to AmaJohn</h3>
          <p>Dear Our Valued Customers, </p>
          <p>Welcome to AmaJohn. A one-stop all solution for your daily needs. With our 24/7 customer service, we all ready to give you the best shopping experience while staying at home.</p>
          <p>Please enjoy your shopping experience with us.</p>
          <p>#AlwaysAmaJohn #EnjoyShopping #StayAtHome #StayPositive</p>
          <br><br>
          <p>Best regards, </p>
          <p>AmaJohn Team</p>
        `
      };
      
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
      return res.status(201).json({
        access_token: access_token,
        email: user.email,
        role: user.role
      });
    } catch(err) {
      console.log(err, "<<<< error in register UserController");
      return next(err);
    }
  }
  
  static async login(req, res, next) {
    try {
      const user = await User.findOne({
        where: {
          email: req.body.email
        }
      });
      if (!user) {
        throw { 
          message: "Invalid email or password", statusCode: 400 
        };
      }
      const isValid = checkPassword(req.body.password, user.password);
      if (isValid) {
        const access_token = generateToken(user);
        return res.status(200).json({
          access_token: access_token,
          email: user.email,
          role: user.role
        });
      } else {
        throw {
          message: "Invalid email or password",
          statusCode: 400
        };
      }
    } catch(err) {
      console.log(err, "<<<< error in login UserController");
      return next(err);
    }
  }

  static async googleLogin(req, res, next) {
    const client = new OAuth2Client(process.env.CLIENT_ID);
    const { google_access_token } = req.headers;
    try {
      const ticket = await client.verifyIdToken({
        idToken: google_access_token,
        audience: process.env.CLIENT_ID
      });
      const payload = ticket.getPayload();
      console.log(payload);
      const getUserName = payload.name;
      const google_email = payload.email;
      const profile_picture = payload.picture;
      const user = await User.findOne({
        where: {
          email: payload.email
        }
      });
      if (!user) {
        const userObj = {
          username: getUserName,
          email: payload.email,
          password: "fullstack"
        };
        const addUser = await User.create(userObj);
        const access_token = generateToken(addUser);
        return res.status(200).json({ access_token, avatar: profile_picture, email: google_email });
      } else {
        const access_token = generateToken(user);
        return res.status(200).json({ access_token, avatar: profile_picture, email: google_email });
      }
    } catch (err) {
      console.log(err, "<<<< error in googleLogin UserController");
      return next(err);
    }
  }

}

module.exports = UserController;