const {verifyToken} = require('../helpers/jwt.js')
const {Product, User, Banner, Cart} = require('../models')

const authenticationAdmin = async (req, res, next) => {
    const {access_token} = req.headers
    
    try {
        
        const userData = verifyToken(access_token)
        
        let user = await User.findOne({
            where: {
                email: userData.email
            }
        })

        if (user && user.role == 'Admin') {
            req.userData = userData
            req.userData.role = user.role
            console.log('masuk ke admin>>>>>>>>>>>>>>>>', user.role);
            next()
        } else {
            throw {msg: "User not authenticated", statusCode: 401}
        }

    } catch(err) {
        return next(err)
    }
}

const authenticationCustomer = async (req, res, next) => {
    const {access_token} = req.headers
    
    try {
        
        const userData = verifyToken(access_token)
        
        let user = await User.findOne({
            where: {
                email: userData.email
            }
        })
        if (user && user.role == 'Customer') {
            req.userData = userData
            req.userData.role = user.role
            console.log('masuk ke cust>>>>>>>>>>>>>>>>>', user.role);
            next()
        } else {
            throw {msg: "User not authenticated", statusCode: 401}
        }

    } catch(err) {
        return next(err)
    }
}


const authorizationProduct = async (req, res, next) => {
    
    const {id} = req.params

    try {
        const product = await Product.findByPk(id) 

            if(product && req.userData.role == 'Admin') {
                next()
            } else {
                throw  {msg: "forbidden access", statusCode: 403}
            }

    } catch(err) {
        return next(err) 
    }
}

const authorizationBanner = async (req, res, next) => {
    
    const {id} = req.params

    try {
        const banner = await Banner.findByPk(id) 

            if(banner && req.userData.role == 'Admin') {
                next()
            } else {
                throw  {msg: "forbidden access", statusCode: 403}
            }

    } catch(err) {
        return next(err) 
    }
}


const authorizationCart = async (req, res, next) => {
    
    const {id} = req.params
    try {
        const cart = await Cart.findByPk(id) 
            if(cart && cart.UserId == req.userData.id) {
                next()
            } else {
                throw  {msg: "forbidden access", statusCode: 403}
            }

    } catch(err) {
        return next(err) 
    }
}

module.exports = {authenticationAdmin, authenticationCustomer, authorizationProduct, authorizationBanner, authorizationCart}