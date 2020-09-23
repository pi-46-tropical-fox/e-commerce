const { User } = require('../models')

const authorization = (req, res, next) => {
    console.log(req.userData.id, '<<< user data id')
    User.findByPk(req.userData.id)
    .then(user=>{
        if(user.role === 'admin'){
            next()
        }
        else{
            console.log('masyuuukkk')
            return res.status(403).json({message: 'User Is Not Authorized'})
        }
    })
    .catch(err =>{
        return res.status(500).json({message: 'internal server error'})
    })
}

module.exports = authorization