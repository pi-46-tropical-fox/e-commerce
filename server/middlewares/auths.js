const jwt = require('jsonwebtoken')   
const { Product, User } = require('../models')  

function authentication(req, res, next){
    const { access_token } = req.headers 

    try {
        if (!access_token) {
            res.status(404).json({ message: '404 - access_token not found'})
        } else{
            const decoded = jwt.verify(access_token, process.env.SECRET_KEY)
            req.userData = decoded

            
            User.findOne({
                where: { email: req.userData.id }
            })
            .then(response => {
                res.status(200).json({message: 'User is authenticated'})
                next()
            })
            .catch( (err)=> {
                console.log('Login Validation Error')
                next()
            })
        }
    } catch (err) {
        res.status(500).json({
            message: err.message || '500 - Internal Server Error Authenticationnnn'})
    }

}

function authorization(req, res, next){
    const { id } = req.params 

    Product.findByPk(Number(id))
    .then(user => {

        if (!user) {
            res.status(404).json({ message: '404 - Authorization user not found' })
        }
        else if (user.UserId != req.userData.id) {
            res.status(401).json({ message: '401 - Unauthorized User' })
        }
        else if (user.UserId == req.userData.id) {
            next()                                     
        }
    })
    .catch( (err) => {
        res.status(500).json({ message: `500 - Internal Server Error Authorization`})
    })
}

module.exports = { authentication, authorization };