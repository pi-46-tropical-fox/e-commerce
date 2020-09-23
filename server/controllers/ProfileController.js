const {User, Profile} = require('../models')
const {verifyToken} = require('../helpers/jwt')

class ProfileController {
    static async getMyProfile (req, res, next) {
        try {
            const profile = await Profile.findOne({
                include: [{
                    model: User,
                    attributes: ['id','firstName', 'lastName']
                }],
                where: {
                    UserId: req.user.id
                }
            })
            if(profile){
                const {address, phone} = profile
                const {firstName, lastName} = profile.User
                return res.status(200).json({firstName, lastName, address, phone})
            }else{
                const {access_token} = req.headers
                const user = verifyToken(access_token)
                const {firstName, lastName} = user
                return res.status(200).json({firstName, lastName})
            }    
        } catch (err) {
            return next(err)
        }
    }
    static async updateMyProfile (req, res, next) {
        try {
            const {address, phone} = req.body
            let obj = {
                address,
                phone,
                UserId: req.user.id
            }
            const data = await Profile.findOne({
                where: {
                    UserId: req.user.id
                }
            })
            if(data){
                const profile = await Profile.update(obj, {
                    where: {
                        UserId: req.user.id
                    }
                })
                return res.status(200).json({message: 'Profile updated'})  
            }else{
                const profile = await Profile.create(obj)
                return res.status(201).json(profile)
            }
        } catch (err) {
            return next(err)
        }
    }
}

module.exports = ProfileController