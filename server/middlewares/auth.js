const { verifyToken } = require('../helpers/jwt')
const { Product, User } = require('../models')

const authentication = async (req, res, next) => {
    const { access_token } = req.headers

    try {
        if (!access_token) {
            throw {statusCode: 401, message: 'User not authenticated'}
        }

        const userData = verifyToken(access_token)
        // console.log(userData, '<<<<<<');
        let user = await User.findOne({
            where: {
                email: userData.email
            }
        })
        
        if (user) {
            req.userData = userData
            next()
        } else {
            throw {message: 'User not authenticated', statusCode: 401}
        }
    } 
    catch(err) {
        let {statusCode, message} = err
        if (!statusCode) {
            statusCode = 500
        }
        return res.status(statusCode).json({err, message})
    }
}


const authorization = async (req, res, next) => {
    try {
        const user = await User.findByPk(req.userData.id)
        if(user && user.role === 'admin') {
            next()
        } else {
            throw {statusCode: 403, message: 'Forbidden access'}
        }
    } catch(err) {
        next(err)
    }
}


module.exports = { authentication, authorization }  