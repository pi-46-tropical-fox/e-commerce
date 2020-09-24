const nodemailer = require('nodemailer');
console.log(process.env.EMAIL, process.env.PASSWORD,'env');
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD
  }
});

module.exports = transporter