require ('dotenv').config
const jwt = require('jsonwebtoken')
const secret = 'tidaaakh'

function generateToken(user) {
    const access_token = jwt.sign({ id: user.id, email:user.email, role:user.role }, secret)
    return access_token
}

function validateToken(access_token) {
    const decoded = jwt.verify(access_token, secret)
    return decoded
}


module.exports = { generateToken, validateToken }